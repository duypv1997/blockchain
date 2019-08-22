const _                 = require('lodash');
const async             = require('async');
const Web3              = require('web3');
const log4js            = require('log4js');
const BN                = require('bignumber.js');
const MIX_ETH_NETWORK       = process.env.MIX_ETH_NETWORK || 'mainnet';
const erc20ABI          = require(`../../resources/assets/js/common/blockchain/eth/abis/erc20.json`);
const networkConfig     = require(`../../resources/assets/js/common/blockchain/eth/networks/${MIX_ETH_NETWORK}.json`);
const tokensBySymbol    = _.keyBy(networkConfig.tokens, 'symbol');
const web3 = new Web3(new Web3.providers.HttpProvider(networkConfig.web3ProviderEnpoint));

const logger = log4js.getLogger('EthTransactionCrawler');
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
const REQUIRED_CONFIRMATION = networkConfig.requiredConfirmation;
const FINISHED_CRAWLING_MSG = `Already processed the newest block. Crawler will be restarted in a few seconds...`;
const tableName = MIX_ETH_NETWORK === 'mainnet' ? `transactions` : `transactions_` + MIX_ETH_NETWORK;

class EthTransactionCrawler {

  start () {
    async.auto({
      latestProcessedBlock: (next) => {
        if (LATEST_PROCESSED_BLOCK > 0) {
          return next(null, LATEST_PROCESSED_BLOCK);
        }

        if (process.env.FORCE_CRAWL_BLOCK) {
          return next(null, parseInt(process.env.FORCE_CRAWL_BLOCK));
        }

        knex(tableName + '_eth')
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
      if (err && err === FINISHED_CRAWLING_MSG) {
        logger.info(FINISHED_CRAWLING_MSG);
        setTimeout(() => {
          this.start();
        }, networkConfig.averageBlockTime);
        return;
      }

      if (err) {
        logger.error(err);
      }

      logger.info(`Crawler will be restarted in a few seconds...`);
      setImmediate(() => {
        this.start();
      });
    });
  }

  processBlocks (latestProcessedBlock, callback) {
    const needProcessBlock = latestProcessedBlock + 1;
    async.auto({
      latestOnchainBlock: (next) => {
        if (LATEST_PROCESSED_BLOCK < LATEST_ONCHAIN_BLOCK - REQUIRED_CONFIRMATION) {
          return next(null, LATEST_ONCHAIN_BLOCK);
        }

        web3.eth.getBlockNumber(next);
      },
      processBlocksOnce: ['latestOnchainBlock', (ret, next) => {
        LATEST_ONCHAIN_BLOCK = ret.latestOnchainBlock;

        // Crawl the newest block already
        if (needProcessBlock > LATEST_ONCHAIN_BLOCK - REQUIRED_CONFIRMATION) {
          return next(FINISHED_CRAWLING_MSG);
        }

        this._processBlocksOnce(needProcessBlock, next);
      }]
    }, (err, ret) => {
      if (err) {
        return callback(err);
      }

      logger.info(`================================================================`);
      LATEST_PROCESSED_BLOCK = needProcessBlock;
      setImmediate(() => {
        this.processBlocks(LATEST_PROCESSED_BLOCK, callback);
      });
    });
  }

  _processBlocksOnce (blockNumber, callback) {
    logger.info(`_processBlocksOnce: ${blockNumber}`);

    async.waterfall([
      (next) => {
        web3.eth.getBlock(blockNumber, true, next);
      },
      (block, next) => {
        this._saveTransactionsData(block, next);
      },
    ], (err, ret) => {
      if (err) {
        return callback(err);
      }

      return callback(null, null);
    });
  }

  _saveTransactionsData (block, callback) {
    const data = [];
    const txs = block.transactions;

    async.forEachLimit(txs, 100, (tx, next) => {
      if (!parseInt(tx.value)) {
        return next(null, null);
      }

      web3.eth.getTransactionReceipt(tx.hash, (err, receipt) => {
        if (err) {
          return next(err);
        }

        if (!receipt) {
          return next(`Cannot get receipt of tx: ${tx.hash}`);
        }

        data.push({
          coin: process.env.MIX_ETH_SYMBOL,
          contract_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          block_number: block.number,
          block_hash: block.hash,
          block_timestamp: block.timestamp,
          txid: tx.hash,
          from_address: tx.from,
          to_address: tx.to,
          amount: tx.value,
          tx_status: receipt.status,
        });

        return next(null, null);
      });
    }, (err, ret) => {
      if (err) {
        return callback(err);
      }

      if (!data.length) {
        return callback(null, null);
      }

      logger.info(`Begin inserting ${data.length} transactions.`);
      Promise.all([
        knex.raw(knex(tableName).insert(data).toString().replace('insert', 'INSERT IGNORE')),
        knex.raw(knex(tableName + '_eth').insert(data).toString().replace('insert', 'INSERT IGNORE'))
      ])
      .then((ret) => {
        logger.info(`Inserted ${data.length} transactions.`);
        return callback(null, null);
      })
      .catch((error) => {
        return callback(error);
      });

    });
  }

};

module.exports = EthTransactionCrawler;
