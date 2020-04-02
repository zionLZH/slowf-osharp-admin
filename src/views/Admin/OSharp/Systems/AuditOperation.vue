<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
    <template slot="header">
      <span auto>
        <el-input clearable v-model="filter.UserName.value" placeholder="用户名/功能/Ip/操作系统" @keyup.enter.native="doSearch" @clear="doSearch"></el-input>
      </span>
      <el-button @click="doSearch">搜索</el-button>
    </template>
    <template slot="method" slot-scope="{ data: item }">
      <el-link type="primary" icon="el-icon-s-order" @click="showDetail=item">详情</el-link>
    </template>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail=false"></drawer-detail>
  </list-view>
</template>

<script>
import  * as apiAuditOperation from '../../../../api/Osharp/AuditOperation'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import cols from './cols/AuditOperation'
import drawerDetail from './drawers/AuditOperationDetail'

export default {
  extends: listModel,
  components: { listView, drawerDetail },
  data () {
    return {
      table: { cols },
      filter: {
        UserName: { key: 'UserName', type: 'like', value: '', or: true },
        Ip: { key: 'Ip', type: 'like', value: '', or: true },
        FunctionName: { key: 'FunctionName', type: 'like', value: '', or: true },
        OperationSystem: { key: 'OperationSystem', type: 'like', value: '', or: true },
      },
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
      this._doSearch(noIndex, {
        before (map) {
          for (let key in map) {
            map[key].value = map.UserName.value
          }
          return map
        }
      })
    },
    async getList () {
      this._getList(apiAuditOperation.Read)
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
