export default {
  data() {
    return {
      isInputPassphrase: true,
      passphrase: '',
      hasError: false,
      privateKey: '',
      error: '',
    };
  },
  props: {
    address: {
      type: Object,
    }
  },
  methods: {
    dumpPrivateKey() {
      if (this.passphrase.length < 6 || this.passphrase.length > 12) {
        this.hasError = true;
        this.error = 'Passphrase must have 6-12 characters';
        return;
      }
      try {
        this.isInputPassphrase = false;
        this.privateKey = window.wallet.dumpPrivateKey(this.address.keystore, this.passphrase);
      } catch(e) {
        this.isInputPassphrase = true;
        console.error(e);
        this.error = e.message;
        this.hasError = true;
      }
    },
    cancel() {
      this.hasError = false;
      this.passphrase = '';
      this.error = '';
    },
  },
}
