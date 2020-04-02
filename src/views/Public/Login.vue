<template>
  <div class="login-container">
    <div class="login-box" v-loading="loading">
      <div class="logo">
        OSharp
      </div>
      <div class="mark">用户登陆</div>
      <div class="item">
        <el-input v-model="form.account" size="middle" prefix-icon="el-icon-user-solid" placeholder="登陆账号" @keyup.enter.native="doLogin"></el-input>
      </div>
      <div class="item">
        <el-input v-model="form.password" size="middle" prefix-icon="el-icon-s-check" type="password" show-password  placeholder="登陆密码" @keyup.enter.native="doLogin"></el-input>
      </div>
      <div class="item">
        <el-button size="middle" style="width: 100%" type="primary" @click="doLogin">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiIdentity from '../../api/Osharp/Identity'
export default {
  data () {
    return {
      loading: false,
      form: {
        account: '1951574665@qq.com',
        password: 'dashen1994'
      },
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      try {
        let submitData = { grantType: 'password', account: this.form.account, password: this.form.password }
        let res = await apiIdentity.Token(submitData)
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        this.$store.commit('updateAuthData', res.Data)
        this.$router.push({ name: 'OsharpIdentityUser' })
      } catch (e) {
        console.error(e)
        this.$message.error(typeof e === 'string' ? e : '请求失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-size: 100% 100%;
  background-image: url("../../assets/img/bg-login.svg");
  .login-box {
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
