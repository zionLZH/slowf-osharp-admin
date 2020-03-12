<template>
  <slowf-block v-loading="loading">
    <slowf-table :cols="table.cols" :data="table.list"></slowf-table>
    <slowf-pager center v-model="table.index" :total="table.count" @change="getList"></slowf-pager>
  </slowf-block>
</template>

<script>
import  * as apiPack from '../../../../api/Osharp/Pack'
import $O from 'slowf/utils/osharp'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import cols from './cols/Pack'
export default {
  components: { slowfBlock, slowfTable, slowfPager, },
  data () {
    return {
      loading: false,
      table: { cols, list: [], index: 1, count: 1 }
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
        let res = await apiPack.Read(submitData)
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
