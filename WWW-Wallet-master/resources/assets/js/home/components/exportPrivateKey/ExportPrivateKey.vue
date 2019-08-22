<template>
  <div class="content-ep">
    <template v-if="isInputPassphrase">
      <p class="des">Input the secret code to export your private key</p>
      <div class="input-group key-phrase">
        <div class="name">
          <p>Secret<br>Code</p>
        </div>
        <div class="input"><input v-model="passphrase" type="text" @keyup.enter="dumpPrivateKey" name="passphrase" autocomplete="off"></div>
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
    color: $txt_dark;
    padding: 0 20px;
    p.des {
      margin: 50px auto 30px;
      font-weight: bold;
      font-size: 13px;
    }
    .key-phrase {
      width: 300px;
      margin: auto;
      .name {
        width: 80px;
        font-size: 12px;
        font-weight: bold;
      }
      .input {
        width: 200px;
        input {
          width: 100%;
          height: 45px;
          border: 1px solid #424242;
          padding: 5px;
          border-radius: 5px;
          text-align: center;
        }
      }
    }

    .button-group {
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      .btn{
        width: 125px;
        float: left;
        color: $white;
        font-size: 1rem;
        height: 40px;
        padding: 0;
        text-transform: uppercase;
        font-weight: bold;
      }
      .btn-submit {
        margin-right: 5px;
        background-color: #00AFEB;
      }
      .btn-cancel {
        background-color: #88D060;
      }
    }
    .title {
      color: $txt_dark;
      margin-top: 50px;
    }
    .private {
      .key {
        width: calc(100% - 60px);
        max-width: calc(100% - 60px);
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        float: left;
      }
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
    .alert {
      color: red;
      text-align: center;
      width: 100%;
    }
  }
</style>
