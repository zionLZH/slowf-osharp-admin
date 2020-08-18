<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
    <template slot="header">
      <el-button v-rms="'Role.Create'" icon="el-icon-plus" @click="showDetail = {}">新增</el-button>
      <span auto>
      <el-input clearable v-model="filter.Name.value" placeholder="角色名称/备注" @keyup.enter.native="doSearch()" @clear="doSearch()"></el-input>
      </span>
      <el-button @click="doSearch()">搜索</el-button>
    </template>
    <template slot="method" slot-scope="{ data: item }">
      <el-dropdown @command="tableCMD(item, $event)">
      <el-link type="primary">操作</el-link>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="edit" icon="el-icon-edit" v-rms="'Role.Create'">编辑</el-dropdown-item>
        <el-dropdown-item command="modules" icon="el-icon-setting" v-rms="'User.SetModules'">权限管理</el-dropdown-item>
        <el-dropdown-item command="function" icon="el-icon-s-help" v-rms="'RoleFunction.ReadFunctions'">查看功能</el-dropdown-item>
        <el-dropdown-item divided></el-dropdown-item>
        <el-dropdown-item command="delete" icon="el-icon-delete" v-rms="'User.Delete'">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </template>
    <drawer-role-function :show="showFunctions" :payload="showFunctions" @close="showFunctions=false"></drawer-role-function>
    <drawer-role-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-role-detail>
    <drawer-role-modules :show="showModules" :payload="showModules" @close="showModules=false"></drawer-role-modules>
  </list-view>
</template>

<script>
import  * as apiRole from '../../../../api/Osharp/Role'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import drawerRoleFunction from './drawers/RoleFunction'
import drawerRoleDetail from './drawers/RoleDetail'
import drawerRoleModules from './drawers/RoleModules'
import cols from './cols/Role'
export default {
  extends: listModel,
  components: { listView, drawerRoleDetail, drawerRoleFunction, drawerRoleModules },
  data () {
    return {
      table: { cols },
      filter: {
        Name: { key: 'Name', type: 'like', value: '', or: true },
        Remark: { key: 'Remark', type: 'like', value: '', or: true }
      },
      showFunctions: false,
      showDetail: false,
      showModules: false
    }
  },
  mounted () {
    this.routerPath({
      keyword: R => this.filter.Name.value = R,
      index: R => this.table.index = R,
      count: R=> this.table.count = R
    }, true)
    this.doSearch(true)
  },
  methods: {
    async doSearch (noIndex) {
      this._doSearch(noIndex, {
        before (map) {
          for (let key in map) {
            map[key].value = map.Name.value
          }
          return map
        }
      })
    },
    async getList () {
      this._getList(apiRole.Read)
      this.routerPath({
        keyword: this.filter.Name.value,
        index: this.table.index,
        count: this.table.count
      })
    },
    async doDelete (item) {
      await this.$confirm('是否确定删除')
      let LOADING = this.$loading()
      this._doOperate(apiRole.Delete, item)
      LOADING.close()
    },
    tableCMD (item, cmd) {
      switch (cmd) {
        case 'edit':
          this.showDetail = item
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
