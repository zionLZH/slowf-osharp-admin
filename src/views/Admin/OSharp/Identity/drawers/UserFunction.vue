<template>
  <slowf-drawer title="用户功能" size="600px" :show="show" @close="$emit('close')">
    <div v-loading="loading" v-if="payload">
      <slowf-table :cols="table.cols" :data="table.list"></slowf-table>
      <slowf-pager center v-model="table.index" page-size="20" :total="table.count" layout="prev, pager, next" @change="getList"></slowf-pager>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiUserFunction from '../../../../../api/Osharp/UserFunction'
  import slowfDrawer from 'slowf/components/drawer'
  import slowfTable from 'slowf/components/table'
  import slowfPager from 'slowf/components/pager'
  import $O from 'slowf/utils/osharp'
  import cols from '../cols/UserFunction'
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
      show (val) {
        !!val && this.getList()
      }
    },
    methods: {
      async getList () {
        this.loading = true
        try {
          let submitData = new $O().pageIndex(this.table.index).pageSize(20).gen()
          let res = await apiUserFunction.ReadFunctions(this.payload.Id, submitData)
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
