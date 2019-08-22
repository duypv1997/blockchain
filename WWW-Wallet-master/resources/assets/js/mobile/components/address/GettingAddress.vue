<template>
  <div class="get-adress">
    <button v-if="!isGetPassphrase" @click="inputPassphrase()" type="button" class="btn btn-primary">GET ADDRESS</button>
    <div v-else>
      <p class="firstRow">For your security you need to set a <span class="yellow">secret code.</span></p>
      <p> 
        You must enter your secret code when you send your tokens. The code is not stored anywhere. And Once you leave this page, you will not be able to recover or change it forever. So you have to copy the code and <span class="yellow">keep it somewhere else safe.</span>
      </p>
      <div class="input-group" v-if="isInputPassphrase">
        <div class="col name">
          <p>SECRET<br>CODE</p>
        </div>
        <div class="col input"><input v-model="passphrase" type="text" name="passphrase" autocomplete="off"></div>
        <button class="btn btn-ok" @click="confirmPassphrase()" type="button">OK</button>
        <div class="clearfix"></div>
        <p v-if="hasError" class="alert">Passphrase must have 6-12 characters</p>
      </div>
      <template v-else>
        <div class="input-group">
          <div class="col name">
            <p>SECRET<br>CODE</p>
          </div>
          <div class="col input"><p class="passphrase">{{passphrase}}</p></div>
          <button class="btn btn-ok" @click="editPassphrase()" type="button">EDIT</button>
        </div>
        <div class="clearfix"></div>
        <div class="button-group">
          <div class="back">
            <button @click="editPassphrase()" type="button">BACK</button>
          </div>
          <div class="make">
            <button @click="getNewAddress()" type="button">Make account</button>
          </div>
        </div>
      </template>
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

  .get-adress {
    margin-bottom: 20px;
  }
  button {
    margin-top: 5em;
    font-family: $font-family-open-sans;
    width: 80%;
    font-weight: bold;
    word-spacing: 0.3rem;
    border-radius: 5px;
    border: none;
    outline: none;
  }
  p {
    text-align: left;
    font-family: $font-family-open-sans;
    margin: 0;

    .yellow {
      color: #c79925;
    }
  }
  .firstRow {
    margin-top: 2rem;
  }
  .input-group {
    margin-top: 5rem;
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
      float: left;
      p {
        margin-top: 6px;
        font-family: $font-family-open-sans;
        text-align: center !important;
        line-height: 1rem;
      }
    }
    .input {
      float: left;
      margin: 0 5px;
      width: calc(100% - 110px);
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
    .btn-ok {
      width: 40px;
      padding: 0;
      float: left;
      margin-top: 0;
      height: 2.7rem;
      color: $white;
      background-color: #fbc030;
      font-weight: bold;
    }
  }
  .button-group {
    margin: 4rem auto 0;
    width: 70%;
    .back {
      width: 38%;
      text-align: right;
      float: left;
      button {
        width: 100%;
        margin: 0;
        background-color: #36b1f0;
        height: 2.7rem;
        color: $white;
      }
    }
    .make {
      width: 58%;
      margin-left: 4%;
      text-align: left;
      float: left;
      button {
        width: 100%;
        margin: 0;
        background-color: #f59330;
        height: 2.7rem;
        color: $white;
      }
    }
  }
  .alert {
    color: red;
    text-align: center;
    margin-top: 1rem;
    width: 100%;
  }
</style>
