<template>
  <div class="modal-container">
    <div class="modal-header">
      NOTICE
    </div>

    <div class="modal-body">
      <p>
        A verification code has been sent to your email. Please check your email and enter your verification code.
      </p>
    </div>

    <div class="modal-footer">
        <button class="btn btn-close" @click="close()">OK</button>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      close() {
        this.$broadcast('close-modal');
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';
  $bg_black: #2A2A2A;

  .modal-container {
    width: 300px;
    margin: 0px auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: $font-family-open-sans;
    text-align: center;
    color: $white;
    .modal-header {
      font-size: 1.3rem;
      background-color: #333333;
      font-weight: bold;
      border: none;
      text-align: center;
      display: block;
    }
    .modal-body {
      background-color: $bg_black;
      margin: 0;
      border: none;
      padding: 30px 40px 0;
      p {
        line-height: 30px;
        font-size: 0.8rem;
        margin: 0;
      }
    }
    .modal-footer {
      text-align: center;
      background-color: $bg_black;
      border: none;
      display: block;
      padding: 20px 40px;
      .btn {
        background: linear-gradient(#424242, #5F5F5F);
        width: 100%;
        padding: 0;
        height: 40px;
      }
    }
  }
</style>
