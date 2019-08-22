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

const Erc20TransactionCrawler = require('./eth/Erc20TransactionCrawler');

const crawler = new Erc20TransactionCrawler();
crawler.start();
