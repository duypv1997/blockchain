import _ from 'lodash';
import Web3 from 'web3';
import BN from 'bignumber.js';

const erc20ABI = require('./abis/erc20.json');
const config = require(`./networks/${process.env.MIX_ETH_NETWORK}.json`);
const tokensBySymbol = _.keyBy(config.tokens, 'symbol');
const web3 = new Web3(new Web3.providers.HttpProvider(config.web3ProviderEnpoint));

/**
 * Interfaces for wallet app to interact with Ethereum network
 * All methods use Promises
 */
class ETHHandler {

  getNewAddress (passphrase) {
    if (typeof passphrase !== 'string' || !passphrase.length) {
      throw new Error(`Passphrase must be a string. Your input: ${passphrase}`);
    }

    const account = web3.eth.accounts.create(web3.utils.randomHex(32));
    return {
      address: account.address,
      keystore: web3.eth.accounts.encrypt(account.privateKey, passphrase),
    };
  }

  getETHBalance (address) {
    return web3.eth.getBalance(address)
      .then(balance => new BN(balance.toString()).div(1e18).toNumber());
  }

  getTokenBalance (symbol, address) {
    const tokenDef = tokensBySymbol[symbol];
    if (!tokenDef) {
      return new Promise((resolve, reject) => {
        reject(`Cannot get config for ERC20 token: ${symbol}`);
      });
    }

    const contract = new web3.eth.Contract(erc20ABI, tokenDef.address);
    return contract.methods.balanceOf(address).call()
      .then(balance => new BN(balance.toString()).div(Math.pow(10, tokenDef.decimal)).toNumber());
  }

  dumpPrivateKey (keystore, passphrase) {
    if (typeof keystore === 'string') {
      keystore = JSON.parse(keystore);
    }

    const account = web3.eth.accounts.decrypt(keystore, passphrase);
    return account.privateKey.toString();
  }

  sendCoin (coin, keystore, passphrase, toAddress, amount, options) {
    if (typeof keystore === 'string') {
      keystore = JSON.parse(keystore);
    }

    const account = web3.eth.accounts.decrypt(keystore, passphrase);
    const tx = this._buildTransaction(coin, toAddress, amount, options);

    return web3.eth.accounts.signTransaction(tx, account.privateKey)
      .then((signedTx) => {

        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .then((ret) => {
            console.log(`Transaction has been confirmed: ${ret.transactionHash}`);
          })
          .catch((err) => {
            window.app.$toasted.error(err.message, {
              theme: "bubble",
              position: "top-center",
              duration : 3000,
              fullWidth: true,
            });
          });

        return web3.utils.sha3(signedTx.rawTransaction);
      });
  }

  _buildTransaction (coin, toAddress, amount, options) {
    if (!options) {
      options = {};
    }

    if (!options.gas) {
      options.gas = 300000;
    }

    let address, value, data;
    if (coin === process.env.MIX_ETH_SYMBOL) {
      address = toAddress;
      value = new BN(amount).multipliedBy(1e18);
    } else {
      const tokenDef = tokensBySymbol[coin];
      const contract = new web3.eth.Contract(erc20ABI, tokenDef.address);
      address = tokenDef.address;
      value = '0x0';
      const tokenValue = new BN(amount).multipliedBy(Math.pow(10, tokenDef.decimal));
      data = contract.methods.transfer(toAddress, tokenValue).encodeABI();
    }

    return {
      to: address,
      value: value,
      gasPrice: options.gasPrice,
      gas: options.gas,
      data: data,
    };
  }

  getNetworkConfig () {
    return config;
  }

  getWeb3Instance () {
    return web3;
  }
};

export default new ETHHandler();