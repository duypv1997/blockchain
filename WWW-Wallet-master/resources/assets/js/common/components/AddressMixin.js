export default {
  props: {
    address: {
      type: Object,
    },
    email: {
      type: String,
    },
  },
  data() {
    return {
      ethBalance: 0,
      wbcBalance: 0,
      persision: 9,
    };
  },
  created() {
    this.getEthBalance();
    this.getWbcBalance();
  },
  methods: {
    getEthBalance() {
      wallet.getBalance('eth', this.address.address)
        .then((ethBalance) => {
          this.ethBalance = ethBalance;
        })
        .catch(err => console.error(err));
    },
    getWbcBalance() {
      wallet.getBalance('www', this.address.address)
        .then((wbcBalance) => {
          this.wbcBalance = wbcBalance;
        })
        .catch(err => console.error(err));
    },
    onSuccess() {
      this.$toasted.success('Copied!', {
        position: "top-center",
        duration : 2000,
      });
    }
  },
}
