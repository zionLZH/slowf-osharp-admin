<template>
  <slowf-header slot="header">
    <div slot="left">
    </div>
    <div class="fn-bar" slot="right">
      <el-tooltip content="退出登陆">
        <span class="el-icon-switch-button" @click="logout"></span>
      </el-tooltip>
      <el-dropdown v-if="userInfo" @command="userCMD" slot="right">
        <span class="user-header">
          <span class="nick">{{ userInfo.NickName }}</span>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </slowf-header>
</template>

<script>
  import * as apiAuth from '../api/Osharp/Auth'
  import * as apiIdentity from '../api/Osharp/Identity'
  import SlowfHeader from 'slowf/components/header'
  export default {
    components: { SlowfHeader },
    data () {
      return {
        userInfo: false
      }
    },
    mounted () {
      this.getUserInfo()
      this.getUserModules()
    },
    methods: {
      async getUserModules () {
        try {
          let res = await apiAuth.GetAuthinfo()
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.$store.commit('updateModuleData', res)
        } catch (e) {
          console.error(e)
          this.$message.error(typeof e === 'string' ? e : '获取用户权限失败')
        }
      },
      async getUserInfo () {
        try {
          let res = await apiIdentity.Profile()
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.userInfo = res
        } catch (e) {
          console.error(e)
          this.$message.error(typeof e === 'string' ? e : '获取用户信息失败')
        }
      },
      reload () {
        document.body.remove()
        location.reload()
      },
      logout () {
        apiIdentity.Logout()
        this.$store.commit('updateAuthData', false)
        this.$store.commit('updateModuleData', [])
        document.body.remove()
        location.reload()
      },
      userCMD (cmd) {
        switch (cmd) {
          case 'logout':
            this.logout()
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-header {
    display: flex;
    align-items: center;
    justify-content: center;
    .head {
      width: 28px;height: 28px;border-radius: 100%;background-color: #f2f2f2;
    }
    .nick {
      padding-left: 10px;
    }
  }
  .fn-bar {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 20px;
    }
    &::v-deep {
      & > [class*="el-icon"] {
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
</style>
