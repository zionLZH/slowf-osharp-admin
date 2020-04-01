<template>
  <slowf-block v-loading="loading">
    <template slot="header">
      <span auto>
        <el-input clearable v-model="filter.UserName.value" placeholder="用户名/功能/Ip/操作系统" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
      </span>
      <el-button @click="doSearch">搜索</el-button>
    </template>
    <slowf-table :cols="table.cols" :data="table.list">
      <template slot-scope="{ data: item }">
        <el-link type="primary" icon="el-icon-s-order" @click="showDetail=item">详情</el-link>
      </template>
    </slowf-table>
    <slowf-pager center v-model="table.index" :total="table.count" @change="getList"></slowf-pager>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail=false"></drawer-detail>
  </slowf-block>
</template>

<script>
import  * as apiAuditOperation from '../../../../api/Osharp/AuditOperation'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerDetail from './drawers/AuditOperationDetail'
import cols from './cols/AuditOperation'
export default {
  components: { slowfBlock, slowfTable, slowfPager, drawerDetail },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 },
      filter: {
        UserName: { key: 'UserName', type: 'like', value: '' },
        Ip: { key: 'Ip', type: 'like', value: '' },
        FunctionName: { key: 'FunctionName', type: 'like', value: '' },
        OperationSystem: { key: 'OperationSystem', type: 'like', value: '' },
      },
      submitFilter: false,
      showDetail: false
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
        let res = await apiAuditOperation.Read(submitData)
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
    tableCMD (item, cmd) {
    }
  }
}
</script>

<style scoped>

</style>
