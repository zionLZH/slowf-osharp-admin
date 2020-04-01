<template>
  <slowf-block v-loading="loading">
    <template slot="header">
      <span auto>
        <el-input clearable v-model="filter.Name.value" placeholder="名称/实体类型" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
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
import  * as apiAuditEntity from '../../../../api/Osharp/AuditEntity'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerDetail from './drawers/AuditEntityDetail'
import cols from './cols/AuditEntity'
export default {
  components: { slowfBlock, slowfTable, slowfPager, drawerDetail },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 },
      filter: {
        Name: { key: 'Name', type: 'like', value: '' },
        TypeName: { key: 'Action', type: 'like', value: '' },
      },
      submitFilter: false,
      showDetail: false
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
        if (filter.Name.value) {
          submitData.or($O.data(key, 'like', filter.Name.value))
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
        let res = await apiAuditEntity.Read(submitData)
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
        keyword: this.filter.Name.value,
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
