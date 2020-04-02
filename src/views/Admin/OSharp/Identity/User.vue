<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
    <template slot="header">
      <el-button v-rms="'User.Create'" icon="el-icon-plus" @click="showDetail = {}">新增</el-button>
      <div split v-rms="'User.Create'"></div>
      <span auto>
        <el-input clearable v-model="filter.UserName.value" placeholder="用户名/昵称/邮箱/手机号" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
      </span>
      <el-button @click="doSearch">搜索</el-button>
    </template>
    <template slot="method" slot-scope="{ data: item }">
      <el-dropdown @command="tableCMD(item, $event)">
        <el-link type="primary">操作</el-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit" icon="el-icon-edit" v-rms="'User.Update'">编辑</el-dropdown-item>
          <el-dropdown-item command="role" icon="el-icon-user-solid" v-rms="'User.SetRoles'">角色管理</el-dropdown-item>
          <el-dropdown-item command="modules" icon="el-icon-setting" v-rms="'UserFunction.ReadFunctions'">权限管理</el-dropdown-item>
          <el-dropdown-item command="function" icon="el-icon-s-help" v-rms="'User.Update'">查看功能</el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item command="delete" icon="el-icon-delete" v-rms="'User.Delete'">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <drawer-user-function :show="showFunctions" :payload="showFunctions" @close="showFunctions=false"></drawer-user-function>
    <drawer-user-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-user-detail>
    <drawer-user-modules :show="showModules" :payload="showModules" @close="showModules=false"></drawer-user-modules>
    <drawer-user-role :show="showRole" :payload="showRole" @close="showRole=false"></drawer-user-role>
  </list-view>
</template>

<script>
import  * as apiUser from '../../../../api/Osharp/User'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import cols from './cols/User'
import drawerUserFunction from './drawers/UserFunction'
import drawerUserDetail from './drawers/UserDetail'
import drawerUserModules from './drawers/UserModules'
import drawerUserRole from './drawers/UserRole'

export default {
  extends: listModel,
  components: { listView, drawerUserFunction, drawerUserDetail, drawerUserModules, drawerUserRole },
  data () {
    return {
      table: { cols },
      filter: {
        UserName: { key: 'UserName', type: 'like', value: '', or: true },
        NickName: { key: 'NickName', type: 'like', value: '', or: true },
        Email: { key: 'Email', type: 'like', value: '', or: true },
        PhoneNumber: { key: 'PhoneNumber', type: 'like', value: '', or: true }
      },
      showFunctions: false,
      showRole: false,
      showDetail: false,
      showModules: false
    }
  },
  mounted () {
    this.routerPath({
      keyword: R => this.filter.UserName.value = R,
      index: R => this.table.index = R,
      count: R=> this.table.count = R
    }, true)
    this.doSearch(true)
  },
  methods: {
    doSearch (noIndex) {
      this._doSearch(noIndex, {
        before (map) {
          for (let key in map) {
            map[key].value = map.UserName.value
          }
          return map
        }
      })
    },
    async getList () {
      this._getList(apiUser.Read)
      this.routerPath({
        keyword: this.filter.UserName.value,
        index: this.table.index,
        count: this.table.count
      })
    },
    async doDelete (item) {
      await this.$confirm('是否确定删除')
      let LOADING = this.$loading()
      this._doOperate(apiUser.Delete, item)
      LOADING.close()
    },
    tableCMD (item, cmd) {
      switch (cmd) {
        case 'edit':
          this.showDetail = item
          break
        case 'role':
          this.showRole = item
          break
        case 'modules':
          this.showModules = item
          break
        case 'function':
          this.showFunctions = item
          break
        case 'delete':
          this.doDelete(item)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
