const COIN = 'eth';
import RequestFactory from '../requests/RequestFactory';

export default {
  data() {
    return {
      isGetPassphrase: false,
      isInputPassphrase: true,
      hasError: false,
      passphrase: '',
    };
  },
  props: {
    userId: {
      type: Number,
    }
  },
  methods: {
    getNewAddress() {
      const address = window.wallet.getNewAddress(COIN, this.passphrase);
      const params = {
        user_id: this.userId,
        address: address.address,
        keystore: JSON.stringify(address.keystore),
      }
      RequestFactory.getRequest('AddressEthRequest').create(params)
        .then(() => {
          window.location.reload();
        })
        .catch(err => console.error(err));
    },
    inputPassphrase() {
      this.isGetPassphrase = true;
    },
    editPassphrase() {
      this.isInputPassphrase = true;
    },
    confirmPassphrase() {
      if (this.passphrase.length >= 6 && this.passphrase.length <= 12) {
        this.hasError = false;
        this.isInputPassphrase = false;
        return;
      }

      this.hasError = true;
      this.isInputPassphrase = true;
    }
  },
}
