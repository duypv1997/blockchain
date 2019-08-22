import _ from 'lodash';
import eth from './eth';

const tokenSymbols = _.map(eth.getNetworkConfig().tokens, 'symbol');

class Wallet {

  constructor () {
    this.eth = eth;
  }

  // Synchronous method
  getNewAddress (coin, passphrase) {
    if (coin === process.env.MIX_ETH_SYMBOL) {
      return eth.getNewAddress(passphrase);
    }

    throw new Error(`Unsupported coin: ${coin}`);
  }

  // Promise
  getBalance (coin, address) {
    // ETH balance
    if (coin === process.env.MIX_ETH_SYMBOL) {
      return eth.getETHBalance(address);
    }

    // ERC20 token balance
    if (_.includes(tokenSymbols, coin)) {
      return eth.getTokenBalance(coin, address);
    }

    return new Promise((resolve, reject) => {
      reject(`Unsupported coin: ${coin}`);
    });
  }

  // Promise
  sendCoin (coin, keystore, passphrase, toAddress, amount, options) {
    if (coin === process.env.MIX_ETH_SYMBOL || _.includes(tokenSymbols, coin)) {
      return eth.sendCoin(coin, keystore, passphrase, toAddress, amount, options);
    }

    return new Promise((resolve, reject) => {
      reject(`Unsupported coin: ${coin}`);
    });
  }

  dumpPrivateKey (keystore, passphrase) {
    return eth.dumpPrivateKey (keystore, passphrase);
  }

}

window.wallet = new Wallet();
