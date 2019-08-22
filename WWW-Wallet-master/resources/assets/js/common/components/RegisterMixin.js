import RequestFactory from '../requests/RequestFactory';
import NotImplementedException from '../exceptions/NotImplementedException';

export default {
  data() {
    return {
      countries: [],
      country: "Korea, Republic of",
      email: null,
      hash: null,
    };
  },
  created() {
    this.countries = require('./countries.json');
  },
  methods: {
    updateEmail(e) {
      this.email = e.target.value;
    },
    updateCountry(e) {
      this.country = e.target.value;
    },
    getCode() {
      if (!this.validEmail() || !this.email) {
        this.$toasted.error('You need input a valid email', {
          position: "top-center",
          theme: "bubble",
          duration: 1000,
          fullWidth: true,
        });
        return;
      }
      const params = {
        email: this.email,
        country: this.country,
      };

      RequestFactory.getRequest('UserRequest').getCode(params)
        .then((res) => {
          this.openModal();
          this.hash = res.data;
        })
        .catch((err) => {
          this.$toasted.error('Error to get code', {
            position: "top-center",
            theme: "bubble",
            duration: 2000,
            fullWidth: true,
          });
        });
    },
    validEmail() {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(this.email);
    },
    openModal() {
      throw new NotImplementedException('Modal doese not implement');
    },
  },
}
