<template>
  <div class="ct-add">
    <div class="address">
      <div class="email">{{ email }}</div>
      <img :src="address.qr_path">
      <div class="txt-address">
        <span>{{ address.address }}</span>
        <button class="btn btn-copy" v-clipboard:copy="address.address">COPY</button>
      </div>
    </div>
    <div class="balance">
      <div class="coin">
        <div class="coin-img">
          <img src="/images/coin_icon.png">
        </div>
        <div class="balance">{{ wbcBalance.toFixed(2) }}</div>
        <div class="coin-name">WWW</div>
      </div>
      <div class="coin">
        <div class="coin-img">
          <img src="/images/eth.png">
        </div>
        <div class="balance">{{ ethBalance.toFixed(8) }}</div>
        <div class="coin-name">ETH</div>
      </div>
    </div>
  </div>
</template>
<script>
  import AddressMixin from '../../../common/components/AddressMixin';
  export default {
    mixins: [AddressMixin],
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  $coinWith: 90px;
  .ct-add {
    font-family: $font-family-open-sans;
    .address {
      text-align: center;
      color: $white;
      margin-top: 2rem;
      .email {
        font-size: 1.2rem;
      }
      img {
        margin: 1rem auto;
      }
      .txt-address {
        font-size: 0.6rem;
        .btn-copy {
          height: 20px;
          background: #1DB1ED;
          font-weight: bold;
          padding: 0;
          text-transform: uppercase;
          font-size: 0.6rem;
          color: white;
          width: 50px;
          margin-left: 5px;
        }
      }
    }
    .balance {
      background: $bg_gray;
      margin: 5rem 0 4rem;
      color: $white;
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
      }
    }
  }
</style>
