<template>
  <div class="container">
    <div class="address">
      <div class="row col-12">
        <div class="col-3">COIN</div>
        <div class="col-9">
          <select v-model="coin" class="form-control">
            <option value="www">WWW</option>
            <option value="eth">ETH</option>
          </select>
        </div>
      </div>
      <div class="col-12 row">
        <div class="col-3">FROM</div>
        <div class="col-9">
          <span>{{ fromAddress }}</span>
        </div>
      </div>
      <div class="col-12 row">
        <div class="col-3">SEND TO</div>
        <div class="col-9">
          <input type="text" v-model="toAddress" class="form-control">
        </div>
      </div>
      <div class="col-12 row">
        <div class="col-3">AMOUNT</div>
        <div class="col-8">
          <input type="number" v-model="amount" class="form-control number">
        </div>
        <div class="col-1 coin-name">{{ coin }}</div>
      </div>
    </div>
    <div class="button">
      <button type="button" class="btn btn-gray" @click="cancel()">CANCEL</button>
      <button type="button" class="btn btn-red" @click="inputPassphrase()">SEND</button>
    </div>
  </div>
</template>
<script>
  import SendingMixin from '../../../common/components/SendingMixin';
  import ModalInputPassphrase from './ModalInputPassphrase.vue';

  export default {
    mixins: [SendingMixin],
    data() {
      return {
        fromAddress: this.address.address,
      };
    },
    methods: {
      inputPassphrase() {
        this.$broadcast('open-modal', ModalInputPassphrase);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  $height: 50px;
  @mixin formControl {
    border: none;
    background: transparent;
    color: $black;
    font-family: $font-family-open-sans;
    outline: none;
    height: calc(#{$height} - 5px);
  }
  .container {
    .address {
      width: 65%;
      margin: auto;
    }
    color: $black;
    font-family: $font-family-open-sans;
    margin-top: 4rem;
    .col-12 {
      padding: 0;
      margin: 1.5rem -5px;
      height: $height;
      border-bottom: 1px solid $black;
      .col-3 {
        line-height: $height;
        font-size: 1rem;
        font-weight: bold;
      }
      .col-8,
      .col-9 {
        text-align: right;
        input {
          @include formControl;
          font-size: 0.8rem;
          text-align: right;
            &.number{
              font-size: 1.2rem;
              font-weight: bold;
            }
        }
        select {
          @include formControl;
          font-weight: bold;
          font-size: 1.4rem;
          text-align-last: right;
          option {
            color: #333;
          }
        }
      }
      .coin-name{
        text-transform: uppercase;
        font-size: 0.9rem;
        line-height: $height;
      }
    }
    .button {
      width: 100%;
      text-align: center;
      margin-top: 4rem;
      .btn {
        font-family: $font-family-open-sans;
        width: 120px;
        font-size: 1rem;
        font-weight: bold;
        margin: 0;
        padding: 0;
        height: 40px;
        color: $white;
        margin: 0 5px;
      }
      .btn-gray {
        background: $bg_thin_gray;
      }
      .btn-red {
        background: $bg_red;
      }
    }
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
