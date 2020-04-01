<template>
  <slowf-block v-loading="loading">
    <template slot="header">
      <el-button v-rms="'User.Create'" icon="el-icon-plus" @click="showDetail = {}">新增</el-button>
      <div split v-rms="'User.Create'"></div>
      <span auto>
        <el-input clearable v-model="filter.UserName.value" placeholder="用户名/昵称/邮箱/手机号" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
      </span>
      <el-button @click="doSearch">搜索</el-button>
    </template>
    <slowf-table :cols="table.cols" :data="table.list">
      <template slot-scope="{ data: item }">
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
    </slowf-table>
    <slowf-pager center v-model="table.index" :total="table.count" @change="getList"></slowf-pager>
    <drawer-user-function :show="showFunctions" :payload="showFunctions" @close="showFunctions=false"></drawer-user-function>
    <drawer-user-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-user-detail>
    <drawer-user-modules :show="showModules" :payload="showModules" @close="showModules=false"></drawer-user-modules>
    <drawer-user-role :show="showRole" :payload="showRole" @close="showRole=false"></drawer-user-role>
  </slowf-block>
</template>

<script>
import  * as apiUser from '../../../../api/Osharp/User'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerUserFunction from './drawers/UserFunction'
import drawerUserDetail from './drawers/UserDetail'
import drawerUserModules from './drawers/UserModules'
import drawerUserRole from './drawers/UserRole'
import cols from './cols/User'
export default {
  components: { slowfBlock, slowfTable, slowfPager, drawerUserFunction, drawerUserDetail, drawerUserModules, drawerUserRole },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 },
      filter: {
        UserName: { key: 'UserName', type: 'like', value: '' },
        NickName: { key: 'NickName', type: 'like', value: '' },
        Email: { key: 'Email', type: 'like', value: '' },
        PhoneNumber: { key: 'PhoneNumber', type: 'like', value: '' }
      },
      submitFilter: false,
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
      let filter = JSON.parse(JSON.stringify(this.filter))
      let submitData = new $O()
      for (let key in filter) {
        if (filter.UserName.value) {
          submitData.or($O.data(key, 'like', filter.UserName.value))
        }
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
        let res = await apiUser.Read(submitData)
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        this.table.list = res.Rows
        this.table.count = res.Total
      } catch (e) {
        console.error(e)
        this.$message.error(typeof e === 'string' ? e : '请求失败')
      }
      this.loading = false
      this.routerPath({
        keyword: this.filter.UserName.value,
        index: this.table.index,
        count: this.table.count
      })
    },
    async doDelete (id) {
      await this.$confirm('是否确定删除？')
      let LOADING = this.$loading()
      try {
        let res = await apiUser.Delete([id])
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
          this.doDelete(item.Id)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
