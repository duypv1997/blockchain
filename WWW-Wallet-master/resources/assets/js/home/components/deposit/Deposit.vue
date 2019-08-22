<template>
  <div class="ct-add">
    <div class="address">
      <div class="email">{{ email }}</div>
      <img :src="address.qr_path">
      <div class="txt-address">{{ address.address }}</div>
    </div>
    <input type="hidden" v-model="message" value="addressText">
    <button type="button" class="btn btn-success"
      v-clipboard:copy="message"
      v-clipboard:success="onSuccess">COPY ADDRESS</button>
  </div>
</template>
<script>
  import DepositMixin from '../../../common/components/DepositMixin';
  export default {
    mixins: [DepositMixin],
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  $coinWith: 90px;
  .ct-add {
    padding: 0 30px;
    text-align: center;
    font-family: $font-family-open-sans;
    .address {
      text-align: center;
      color: $black;
      margin-top: 2rem;
      .email {
        font-size: 1.2rem;
      }
      img {
        margin: 1rem auto;
      }
      .txt-address {
        font-size: 1rem;
        word-wrap: break-word;
      }
    }
    .btn-success {
      background: #88D060;
      font-family: $font-family-open-sans;
      font-weight: bold;
      margin-top: 2rem;
      width: 200px;
    }
    margin-bottom: 40px;
  }
</style>
