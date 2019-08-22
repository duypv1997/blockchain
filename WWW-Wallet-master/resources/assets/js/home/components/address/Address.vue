<template>
  <div class="ct-add">
    <div class="address">
      <div class="email">{{ email }}</div>
      <img :src="address.qr_path">
      <div class="txt-address" v-model="message">
        {{ address.address }}
        <button type="button"
                class="btn btn-copy"
                v-clipboard:copy="message"
                v-clipboard:success="onSuccess"
                >COPY</button>
      </div>
    </div>
    <div class="balance">
      <div class="coin">
        <div class="coin-img">
          <img src="/images/coin_icon.png">
          <span class="coin-name-medium">WWW</span>
        </div>
        <div class="balance">{{ wbcBalance.toFixed(2) }}</div>
        <div class="coin-name">WWW</div>
      </div>
      <div class="coin">
        <div class="coin-img">
          <img src="/images/eth.png">
          <span class="coin-name-medium">ETH</span>
        </div>
        <div class="balance">{{ ethBalance.toFixed(6) }}</div>
        <div class="coin-name">ETH</div>
        <div class="ending-line"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import AddressMixin from '../../../common/components/AddressMixin';
  export default {
    mixins: [AddressMixin],
    data() {
      return {
        message: this.address.address,
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  $coinWith: 90px;
  .ct-add {
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
        font-size: 0.7rem;
        .btn-copy {
          margin-left: 0.5rem;
          color: $white;
          font-size: 10px;
          background: #0065B8;
          height: 25px;
          padding: 0;
          width: 50px;
        }
      }
    }
    .balance {
      margin: 5rem auto 0;
      width: 65%;
      color: $black;
      .coin {
        border-top: 1px solid #4a4a4a;
        height: 6rem;
        .coin-img {
          width: $coinWith;
          float: left;
          text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          img {
            margin-left: 30px;
            width: 35px;
            height: 35px;
          }
        }
        .balance{
          text-align: right;
          float: left;
          line-height: 6rem;
          width: calc(100% - #{$coinWith*2});
          margin: 0;
          padding: 0 1rem 0 0;
          font-size: 1.6rem;
        }
        .coin-name {
          height: 100%;
          text-align: left;
          width: $coinWith;
          float: left;
          display: flex;
          align-items: center;
        }
        .coin-name-medium {
          @extends coin-name;
          margin-left: 50px;
          font-size: 2rem;
          font-weight: lighter;
        }
      }
    }
  }
</style>
