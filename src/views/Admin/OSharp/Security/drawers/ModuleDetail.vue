<template>
  <slowf-drawer title="查看模块功能" size="700px" :show="show" @close="$emit('close')">
    <div v-loading="loading">
      <slowf-table :cols="table.cols" :data="table.list"></slowf-table>
      <slowf-pager center v-model="table.index" page-size="20" :total="table.count" @change="getList"></slowf-pager>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiModule from '../../../../../api/Osharp/Module'
  import slowfDrawer from 'slowf/components/drawer'
  import slowfTable from 'slowf/components/table'
  import slowfPager from 'slowf/components/pager'
  import $O from 'slowf/utils/osharp'
  import cols from '../cols/ModuleDetail'
  export default {
    props: ['show', 'payload'],
    components: { slowfDrawer, slowfTable, slowfPager },
    data () {
      return {
        loading: false,
        table: { cols, list: [], index: 1, count: 1 },
      }
    },
    watch: {
      payload (val) {
        if (val) {
          this.table.list = []
          this.table.index = 1
          this.getList()
        }
      }
    },
    methods: {
      async getList () {
        this.loading = true
        try {
          let submitData = new $O().pageIndex(this.table.index).pageSize(20).and($O.data('TreePathString', 'like', `$${this.payload.Id}$`)).gen()
          let res = await apiModule.ReadFunctions(submitData)
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
      },
    }
  }
</script>

<style scoped>

</style>
