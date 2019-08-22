<template>
  <button v-if="!isGetPassphrase" @click="inputPassphrase()" type="button" class="btn btn-primary">GET ADDRESS</button>
  <div v-else class="container">
    <p class="description">For your security you need to set a secret code. You must enter your secret code when you send your tokens. The code is not stored anywhere. And Once you leave this page, <span class="txt-red">you will not be able to recover or change it forever</span>. So you have to <span class="txt-red">copy the code and keep it somewhere else safe.</span>
    </p>
    <div class="input-group area-phrase">
      <div class="name">
        <p>SECRET<br>CODE</p>
      </div>
      <div class="input"><input :disabled="!isInputPassphrase" @keyup.enter="confirmPassphrase" v-model="passphrase" type="text" name="passphrase" autocomplete="off"></div>
      <button class="btn btn-ok" v-if="isInputPassphrase" @click="confirmPassphrase()" type="button">OK</button>
      <button class="btn btn-ok" v-if="!isInputPassphrase" @click="editPassphrase()" type="button">EDIT</button>
      <div class="clearfix"></div>
      <button @click="getNewAddress()" v-if="!isInputPassphrase" type="button" class="btn btn-primary">Make account</button>
      <p v-if="hasError" class="alert">Passphrase must have 6-12 characters</p>
    </div>
  </div>
</template>
<script>
  import GettingAddressMixin from '../../../common/components/GettingAddressMixin';

  export default {
    mixins: [GettingAddressMixin],
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  button {
    margin-top: 5em;
    font-family: $font-family-open-sans;
    background: #0065B8;
    width: 300px;
    font-weight: bold;
    word-spacing: 0.3rem;
  }
  .container {
    .txt-red {
      color: red;
      font-weight: bold;
    }
    p.description {
      padding: 0 130px;
      text-align: left;
    }
    .area-phrase {
      width: 420px;
      margin: 110px auto;
      .name {
        width: 55px;
        font-weight: bold;
        color: #333;
        font-size: 13px;
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
      }
      .input {
        width: 250px;
        height: 45px;
        margin: 0 10px;
        input {
          border: 1px solid #4f4f4f;
          width: 100%;
          height: 45px;
          border-radius: 5px;
          padding: 0 5px;
          text-align: center;
          &:disabled {
            background: #D3D2D3;
            border: 1px solid #f2f2f2;
          }
        }
      }
      .btn-ok {
        margin: 0;
        width: 60px;
        height: 45px;
        border: 1px solid #FFB806;
        background: #FFB806;
      }
      .alert {
        width: 100%;
        color: red;
      }
      .btn-primary {
        margin: 40px auto;
        text-transform: uppercase;
      }
    }
  }
</style>
