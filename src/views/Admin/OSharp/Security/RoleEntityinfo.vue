<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
    <template slot="header" v-rms="'RoleEntity.Create'">
      <el-button icon="el-icon-plus" @click="showDetail = {}">新增</el-button>
    </template>
    <template slot="method" slot-scope="{ data: item }">
      <el-dropdown @command="tableCMD(item, $event)">
        <el-link type="primary">操作</el-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit" icon="el-icon-setting" v-rms="'RoleEntity.Update'">设置</el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item command="delete" icon="el-icon-delete" v-rms="'RoleEntity.Delete'">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-detail>
  </list-view>
</template>

<script>
import  * as apiRoleEntity from '../../../../api/Osharp/RoleEntity'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import cols from './cols/RoleEntityinfo'
import drawerDetail from './drawers/RoleEntityinfoDetail'

export default {
  extends: listModel,
  components: { listView, drawerDetail },
  data () {
    return {
      table: { cols },
      showDetail: false
    }
  },
  mounted () {
    this.routerPath({
      index: R => this.table.index = R,
      count: R=> this.table.count = R
    }, true)
    this.getList()
  },
  methods: {
    async getList () {
      this._getList(apiRoleEntity.Read)
      this.routerPath({
        index: this.table.index,
        count: this.table.count
      })
    },
    async doDelete (item) {
      await this.$confirm('是否确定删除')
      let LOADING = this.$loading()
      this._doOperate(apiRoleEntity.Delete, item)
      LOADING.close()
    },
    tableCMD (item, cmd) {
      switch (cmd) {
        case 'edit':
          this.showDetail = item
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
