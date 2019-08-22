export default {
  props: {
    address: {
      type: Object,
    },
    email: {
      type: String,
    },
  },
  methods: {
    onSuccess() {
      this.$toasted.success('Copied!', {
        position: "top-center",
        duration : 2000,
      });
    }
  }
}
