<template>
  <div class="modal-container">
    <div class="modal-header">
      NOTICE
    </div>

    <div class="modal-body">
      <p>
        등록하신 이메일로 인증 코드를 발송했습니다. 이메일을 확인하시고 인증코드를 입력하세요.
      </p>
    </div>

    <div class="modal-footer">
        <button class="btn btn-close" @click="close()">확인</button>
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
  $bg_black: #FFFFFF;

  .modal-container {
    width: 300px;
    margin: 0px auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: $font-family-open-sans;
    text-align: center;
    color: $black;
    .modal-header {
      font-size: 1.3rem;
      background-color: #E6E6E6;
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
        color: $white;
        background: #006FBA;
        width: 100%;
        padding: 0;
        height: 40px;
      }
    }
  }
</style>
