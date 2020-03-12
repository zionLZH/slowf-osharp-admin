<template>
  <slowf-block v-loading="loading">
    <slowf-table :cols="table.cols" :data="table.list">
      <template slot-scope="{ data: item }">
        <el-dropdown @command="tableCMD(item, $event)">
          <el-link type="primary">操作</el-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit" icon="el-icon-edit" v-rms="'UserRole.Update'">编辑</el-dropdown-item>
            <el-dropdown-item divided></el-dropdown-item>
            <el-dropdown-item command="delete" icon="el-icon-delete" v-rms="'UserRole.Delete'">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </slowf-table>
    <slowf-pager center v-model="table.index" :total="table.count" @change="getList"></slowf-pager>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail = false;getList()"></drawer-detail>
  </slowf-block>
</template>

<script>
import  * as apiUserRole from '../../../../api/Osharp/UserRole'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerDetail from './drawers/UserRoleDetail'
import cols from './cols/UserRole'
export default {
  components: {
    slowfBlock, slowfTable, slowfPager, drawerDetail },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 },
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
      this.loading = true
      try {
        let submitData = new $O().pageIndex(this.table.index).pageSize(10).gen()
        let res = await apiUserRole.Read(submitData)
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
        index: this.table.index,
        count: this.table.count
      })
      this.loading = false
    },
    async doDelete (id) {
      await this.$confirm('是否确定删除？')
      let LOADING = this.$loading()
      try {
        let res = await apiUserRole.Delete([id])
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
