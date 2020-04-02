<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
  </list-view>
</template>

<script>
import  * as apiPack from '../../../../api/Osharp/Pack'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import cols from './cols/Pack'

export default {
  extends: listModel,
  components: { listView },
  data () {
    return {
      table: { cols }
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
      this._getList(apiPack.Read)
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
