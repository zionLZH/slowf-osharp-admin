<template>
  <div class="err-container">
    <div class="err-box">
      <h1>
        Oops! 访问出错啦！
      </h1>
      <div class="item">
        当前访问页面出错，<br/>
        可能是没有权限或找不到对应页面
      </div>
      <div class="item" align="right">
        <el-button type="primary" @click="$router.go(-1)">返回上页</el-button>
        <el-button @click="doIndex">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    doIndex () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.err-container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-size: 100% 100%;
  background-image: url("../../assets/img/bg-login.svg");
  .err-box {
    width: 320px;
    height: auto;
    padding: 20px;
    margin-top: 80px;
    background-color: #fff;
    border-radius: 10px;
    .item {
      margin-top: 20px;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      line-height: 1;
      font-weight: bold;
    }
    .mark {
      margin-top: 10px;
      font-size: 16px;
      color: #999;
      text-align: center;
    }
  }
}
</style>
