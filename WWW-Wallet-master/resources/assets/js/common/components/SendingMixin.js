
export default {
  props: {
    address: {
      type: Object,
    },
    userId: {
      type: Number,
    },
  },
  data() {
    return {
      coin: 'eth',
      amount: 0,
      toAddress: '',
    };
  },
  methods: {
    cancel() {
      this.coin = 'eth';
      this.amount = 0;
      this.toAddress = '';
    },
    send(passphrase) {
      try {
        wallet.sendCoin(this.coin, this.address.keystore, passphrase, this.toAddress, this.amount)
          .then(() => {
            this.cancel();
            this.$toasted.success('Transaction submitted!', {
              theme: "bubble",
              position: "top-center",
              duration : 3000,
              fullWidth: true,
            });
          })
          .catch((err) => {
            console.error(err);
            this.$toasted.error(err.message, {
              theme: "bubble",
              position: "top-center",
              duration : 3000,
              fullWidth: true,
            });
          });
      } catch (err) {
        this.$toasted.error(err.message, {
          theme: "bubble",
          position: "top-center",
          duration : 3000,
          fullWidth: true,
        });
      }
    },
  },
  created() {
    this.$on('sendCoin', this.send);
  },
}
