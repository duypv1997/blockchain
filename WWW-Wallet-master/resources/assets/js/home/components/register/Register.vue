<template>
  <div>
    <slot :countries="countries" :country="country" :email="email" :updateEmail="updateEmail" :hash="hash" :updateCountry="updateCountry" :getCode="getCode"></slot>
  </div>
</template>
<script>
  import RegisterMixin from '../../../common/components/RegisterMixin';
  import ModalGetCodeSuccessful from './ModalGetCodeSuccessful.vue';

  export default {
    mixins: [RegisterMixin],
    methods: {
      openModal() {
        this.$broadcast('open-modal', ModalGetCodeSuccessful);
      },
    }
  };
</script>
