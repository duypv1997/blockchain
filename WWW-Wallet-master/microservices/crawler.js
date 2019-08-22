require('dotenv').config();
require('log4js').configure({
  appenders: {
    out: { type: 'console' },
  },
  categories: {
    default: { appenders: ['out'], level: process.env.LOG_LEVEL || 'INFO' }
  }
});
const logger = require('log4js').getLogger();

const EthTransactionCrawler = require('./eth/EthTransactionCrawler');

const crawler = new EthTransactionCrawler();
crawler.start();
