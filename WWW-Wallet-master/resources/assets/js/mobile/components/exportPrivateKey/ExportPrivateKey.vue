<template>
  <div class="content-ep">
    <template v-if="isInputPassphrase">
      <p>To export private key input your secret code</p>
      <div class="input-group">
        <div class="col name">
          <p>Secret<br>Code</p>
        </div>
        <div class="col input"><input v-model="passphrase" type="text" name="passphrase" autocomplete="off"></div>
        <div class="clearfix"></div>
        <span v-if="hasError" class="alert">{{ error }}</span>
      </div>
      <div class="button-group">
        <button @click="dumpPrivateKey" class="btn btn-submit">Submit</button>
        <button @click="cancel" class="btn btn-cancel">Cancel</button>
      </div>
    </template>
    <template v-else>
      <h3 class="title">PRIVATE KEY</h3>
      <div class="private">
        <div class="key">{{ privateKey }}</div>
        <button class="btn btn-copy" v-clipboard:copy="privateKey">COPY</button>
      </div>
    </template>
  </div>
</template>
<script>
  import ExportPrivateKeyMixin from '../../../common/components/ExportPrivateKeyMixin';

  export default {
    mixins: [ExportPrivateKeyMixin],
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';

  .content-ep {
    color: $white;
    padding: 0 20px;
    .input-group {
      margin-top: 2rem;
      .col {
        float: left;
        padding: 0;
        flex-basis: auto !important;
        .passphrase {
          font-family: $font-family-open-sans;
          font-weight: bold;
          text-align: center;
          line-height: 2.7rem;
          font-size: 1.2rem;
        }
      }
      .name {
        width: 60px;
        p {
          margin-top: 6px;
          text-align: center !important;
          line-height: 1rem;
          text-transform: uppercase;
          font-weight: bold;
        }
      }
      .input {
        margin-left: 5px;
        width: calc(100% - 65px);
        input {
          width: 100%;
          height: 2.7rem;
          font-family: $font-family-open-sans;
          font-weight: bold;
          border-radius: 5px;
          border: none;
          text-align: center;
          font-size: 1.2rem;
          &:focus {
            outline: none;
          }
        }
      }
    }
    .button-group {
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      .btn{
        width: 48%;
        float: left;
        color: $white;
        font-size: 1rem;
        height: 40px;
        padding: 0;
        text-transform: uppercase;
        font-weight: bold;
      }
      .btn-submit {
        margin-right: 4%;
        background-color: #00AFEB;
      }
      .btn-cancel {
        background-color: #88D060;
      }
    }
    .private {
      color: $white;
      font-size: 0.7rem;
      font-family: $font-family-open-sans;
      .key {
        float: left;
        max-width: calc(100% - 55px);
        width: calc(100% - 55px);
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .btn-copy {
        float: left;
        height: 20px;
        width: 50px;
        margin-left: 5px;
        font-size: 0.7rem;
        color: $white;
        background: #1DB1ED;
        font-weight: bold;
        padding: 0;
        text-transform: uppercase;
      }
    }
    .alert {
      color: red;
      text-align: center;
      width: 100%;
    }
  }
</style>
