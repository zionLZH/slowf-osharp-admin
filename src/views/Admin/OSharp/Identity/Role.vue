<template>
  <slowf-block v-loading="loading">
    <template slot="header">
      <el-button v-rms="'Role.Create'" icon="el-icon-plus" @click="showDetail = {}">新增</el-button>
      <span auto v-rms="'Role.Create'">
        <el-input clearable v-model="filter.Name.value" placeholder="角色名称/备注" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
      </span>
      <el-button @click="doSearch">搜索</el-button>
    </template>
    <slowf-table :cols="table.cols" :data="table.list">
      <template slot-scope="{ data: item }">
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
    </slowf-table>
    <slowf-pager center v-model="table.index" :total="table.count" @change="getList"></slowf-pager>
    <drawer-role-function :show="showFunctions" :payload="showFunctions" @close="showFunctions=false"></drawer-role-function>
    <drawer-role-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-role-detail>
    <drawer-role-modules :show="showModules" :payload="showModules" @close="showModules=false"></drawer-role-modules>
  </slowf-block>
</template>

<script>
import  * as apiRole from '../../../../api/Osharp/Role'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerRoleFunction from './drawers/RoleFunction'
import drawerRoleDetail from './drawers/RoleDetail'
import drawerRoleModules from './drawers/RoleModules'
import cols from './cols/Role'
export default {
  components: { slowfBlock, slowfTable, slowfPager, drawerRoleDetail, drawerRoleFunction, drawerRoleModules },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 },
      filter: {
        Name: { key: 'Name', type: 'like', value: '' },
        Remark: { key: 'Remark', type: 'like', value: '' }
      },
      submitFilter: false,
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
    doSearch (noIndex) {
      let filter = JSON.parse(JSON.stringify(this.filter))
      let submitData = new $O()
      for (let key in filter) {
        submitData.or($O.data(key, 'like', filter.Name.value))
      }
      this.submitFilter = submitData.getFilterGroup()
      if (!noIndex) {
        this.table.index = 1
      }
      this.getList()
    },
    async getList () {
      this.loading = true
      try {
        let submitData = new $O().pageIndex(this.table.index).pageSize(10).setFilterGroup(this.submitFilter).gen()
        let res = await apiRole.Read(submitData)
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        this.table.list = res.Rows
        this.table.count = res.Total
      } catch (e) {
        console.error(e)
        this.$message.error(typeof e === 'string' ? e : '请求失败')
      }
      this.routerPath({
        keyword: this.filter.Name.value,
        index: this.table.index,
        count: this.table.count
      })
      this.loading = false
    },
    async doDelete (id) {
      await this.$confirm('是否确定删除')
      let LOADING = this.$loading()
      try {
        let res = await apiRole.Delete([id])
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        this.$message.success('删除完成')
        this.getList()
      } catch (e) {
        console.error(e)
        this.$message.error(typeof e === 'string' ? e : '请求失败')
      }
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
          this.doDelete(item.Id)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
