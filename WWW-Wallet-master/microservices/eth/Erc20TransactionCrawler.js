const _                 = require('lodash');
const async             = require('async');
const Web3              = require('web3');
const log4js            = require('log4js');
const BN                = require('bignumber.js');
const MIX_ETH_NETWORK       = process.env.MIX_ETH_NETWORK || 'mainnet';
const erc20ABI          = require(`../../resources/assets/js/common/blockchain/eth/abis/erc20.json`);
const networkConfig     = require(`../../resources/assets/js/common/blockchain/eth/networks/${MIX_ETH_NETWORK}.json`);
const tokensBySymbol    = _.keyBy(networkConfig.tokens, 'symbol');
const tokensByAddress   = _.keyBy(networkConfig.tokens, (t) => t.address.toLowerCase());
const web3 = new Web3(new Web3.providers.HttpProvider(networkConfig.web3ProviderEnpoint));
const formatters = require('web3-core-helpers').formatters;

web3.extend({
  methods: [{
    name: 'getLogs',
    call: 'eth_getLogs',
    params: 1,
    inputFormatter: [formatters.inputLogFormatter],
    outputFormatter: formatters.outputLogFormatter
  }]
});

const logger = log4js.getLogger('Erc20TransactionCrawler');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
  }
});

let LATEST_PROCESSED_BLOCK = 0;
let LATEST_ONCHAIN_BLOCK = 0;
const BATCH_BLOCK_SIZE = 7;
const REQUIRED_CONFIRMATION = networkConfig.requiredConfirmation;
const FINISHED_CRAWLING_MSG = `Already processed the newest block. Crawler will be restarted in a few seconds...`;
const tableName = MIX_ETH_NETWORK === 'mainnet' ? `transactions` : `transactions_` + MIX_ETH_NETWORK;
const CACHED_BLOCKS = {};

class ERC20DepositCrawler {

  start () {
    async.auto({
      latestProcessedBlock: (next) => {
        if (LATEST_PROCESSED_BLOCK > 0) {
          return next(null, LATEST_PROCESSED_BLOCK);
        }

        if (process.env.FORCE_CRAWL_BLOCK) {
          return next(null, parseInt(process.env.FORCE_CRAWL_BLOCK));
        }

        knex(tableName + '_erc20')
          .max('block_number as max')
          .then(ret => {
            let maxBlockNumber = 1;
            try {
              maxBlockNumber = (parseInt(ret[0].max));
            } catch (e) {
              return next(null, 1);
            }

            if (isNaN(maxBlockNumber)) {
              maxBlockNumber = 1;
            }

            if (maxBlockNumber < networkConfig.startCrawlBlock) {
              maxBlockNumber = networkConfig.startCrawlBlock;
            }

            return next(null, maxBlockNumber);
          })
          .catch(err => {
            return next(err);
          });
      },
      processBlocks: ['latestProcessedBlock', (ret, next) => {
        this.processBlocks(ret.latestProcessedBlock - 1, next);
      }]
    }, (err, ret) => {
      if (err) {
        logger.error(err);
        logger.info(`Crawler will be restarted in a few seconds...`);
      } else {
        logger.info(`Already processed the newest block. Crawler will be restarted in a few seconds...`);
      }

      setTimeout(() => {
        this.start();
      }, networkConfig.averageBlockTime);
    });
  }

  processBlocks (latestProcessedBlock, callback) {
    let fromBlockNumber, toBlockNumber;
    async.auto({
      latestOnchainBlock: (next) => {
        web3.eth.getBlockNumber(next);
      },
      processBlocksOnce: ['latestOnchainBlock', (ret, next) => {
        const latestOnchainBlock = ret.latestOnchainBlock;
        fromBlockNumber = latestProcessedBlock + 1;

        // Crawl the newest block already
        if (fromBlockNumber > latestOnchainBlock - REQUIRED_CONFIRMATION) {
          toBlockNumber = latestProcessedBlock;
          return next(null, true);
        }

        toBlockNumber = latestProcessedBlock + BATCH_BLOCK_SIZE;
        if (toBlockNumber > latestOnchainBlock - REQUIRED_CONFIRMATION) {
          toBlockNumber = latestOnchainBlock - REQUIRED_CONFIRMATION;
        }

        this._processBlocksOnce(fromBlockNumber, toBlockNumber, next);
      }]
    }, (err, ret) => {
      if (err) {
        return callback(err);
      }

      if (ret.processBlocksOnce === true) {
        return callback(null, true);
      }

      logger.info(`================================================================`);
      LATEST_PROCESSED_BLOCK = toBlockNumber;
      process.nextTick(this.start.bind(this));
    });
  }

  _processBlocksOnce (fromBlockNumber, toBlockNumber, callback) {
    logger.info(`_processBlocksOnce: ${fromBlockNumber}→${toBlockNumber}`);
    web3.getLogs({
      fromBlock: web3.utils.toHex(fromBlockNumber),
      toBlock: web3.utils.toHex(toBlockNumber),
      topics: [networkConfig.eventTopics.erc20Transfer]
    }, (err, ret) => {
      if (err) {
        return callback(`Cannot query data from network: ${err.toString()}`);
      }

      this._processLogData(ret, callback);
    });
  }

  _processLogData (arrayData, callback) {
    const records = [];
    async.forEachLimit(arrayData, 100, (log, next) => {
      if (!log.topics || log.topics.length !== 3 || log.topics[0] !== networkConfig.eventTopics.erc20Transfer) {
        return next(null, null);
      }

      const data = web3.utils.hexToBytes(log.data);
      if (data.length !== 32) {
        return next(null, null);
      }

      const contractAddress = log.address.toLowerCase();
      const tokenDef = tokensByAddress[contractAddress];
      if (!tokenDef) {
        return next(null, null);
      }

      const coin = tokenDef ? tokenDef.symbol : contractAddress;
      const blockNumber = log.blockNumber;
      const fromAddress = web3.eth.abi.decodeParameter('address', log.topics[1]);
      const toAddress = web3.eth.abi.decodeParameter('address', log.topics[2]);
      const amount = web3.eth.abi.decodeParameter('uint256', log.data);

      this._getOneBlock(blockNumber, (err, block) => {
        if (err) {
          return next(err);
        }

        if (!block) {
          return next(`Cannot get block: ${blockNumber}`);
        }

        records.push({
          coin: coin,
          contract_address: contractAddress,
          block_number: log.blockNumber,
          block_hash: log.blockHash,
          block_timestamp: block.timestamp,
          txid: log.transactionHash,
          from_address: fromAddress,
          to_address: toAddress,
          amount: amount,
          log_id: log.id,
          tx_status: 1,
        });

        next(null, null);
      });
    }, (err) => {
      if (err) {
        return callback(err);
      }

      Promise.all([
        knex.raw(knex(tableName).insert(records).toString().replace('insert', 'INSERT IGNORE')),
        knex.raw(knex(tableName + '_erc20').insert(records).toString().replace('insert', 'INSERT IGNORE'))
      ])
      .then((ret) => {
        logger.info(`Inserted ${records.length} transactions.`);
        return callback(null, null);
      })
      .catch((error) => {
        return callback(error);
      });
    });
  }

  _getOneBlock (blockNumber, callback) {
    if (CACHED_BLOCKS[blockNumber]) {
      return callback(null, CACHED_BLOCKS[blockNumber]);
    }

    web3.eth.getBlock(blockNumber, (err, block) => {
      if (err) {
        return callback(err);
      }

      CACHED_BLOCKS[blockNumber] = block;
      return callback(null, block);
    });
  }

};

module.exports = ERC20DepositCrawler;
