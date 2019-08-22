import RequestFactory from '../requests/RequestFactory';
import moment from 'moment';
import _ from 'lodash';
import BN from 'bignumber.js';
const config = require(`../blockchain/eth/networks/${process.env.MIX_ETH_NETWORK}.json`);
const tokensBySymbol = _.keyBy(config.tokens, 'symbol');

export default {
  props: {
    address: {
      type: Object,
    }
  },
  data() {
    return {
      pagination: {},
      data: {},
      total: 0,
      perPage: 0,
    };
  },
  methods: {
    getTransaction() {
      console.log(pagination);
    },
    getDay(item) {
      return moment(item.block_timestamp*1000).format('MM.DD');
    },
    getHour(item) {
      return moment(item.block_timestamp*1000).format('HH:mm');
    },
    getInOut(item) {
      return this.address.address === item.to_address ? 'in' : 'out';
    },
    getAmountClass(item) {
      return this.address.address === item.to_address ? 'amount green' : 'amount red';
    },
    gotoPage() {
      const params = {
        page: this.pagination.currentPage,
        address: this.address.address,
      }
      RequestFactory.getRequest('TransactionRequest').getAll(params)
        .then((res) => {
          res.data = this.formatAmount(res.data);
          this.data = Object.assign({}, res.data);
          this.total = res.meta.total;
          this.perPage = res.per_page;
        });
    },
    formatAmount(data) {
      data.forEach(function(value) {
        value.amount = new BN(value.amount).div(Math.pow(10, tokensBySymbol[value.coin].decimal)).toFormat();
      });
      return data;
    }
  },
  created() {
    const params = {
      address: this.address.address,
    }
    RequestFactory.getRequest('TransactionRequest').getAll(params)
      .then((res) => {
        res.data = this.formatAmount(res.data);
        this.data = Object.assign({}, res.data);
        this.total = res.meta.total;
        this.perPage = res.per_page;
      });
  }
}
