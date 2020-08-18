<template>
  <list-view v-loading="loading" :table="table.list" :cols="table.cols" :page-index.sync="table.index" :page-total="table.count" @getList="getList">
    <template slot="header">
      <span auto>
        <el-input clearable v-model="filter.Name.value" placeholder="名称/实体类型" @keyup.enter.native="doSearch()" @clear="doSearch()"></el-input>
      </span>
      <el-button @click="doSearch()">搜索</el-button>
    </template>
    <template slot="method" slot-scope="{ data: item }">
      <el-link type="primary" icon="el-icon-s-tools" @click="showDetail=item" v-rms="'EntityInfo.Update'">设置</el-link>
    </template>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail=false;getList()"></drawer-detail>
  </list-view>
</template>

<script>
import  * as apiEntityinfo from '../../../../api/Osharp/Entityinfo'
import listModel from 'slowf/extend/osharp/list/model'
import listView from 'slowf/extend/osharp/list/view'
import cols from './cols/Entityinfo'
import drawerDetail from './drawers/EntityinfoDetail'

export default {
  extends: listModel,
  components: { listView, drawerDetail },
  data () {
    return {
      table: { cols },
      filter: {
        Name: { key: 'Name', type: 'like', value: '', or: true },
        TypeName: { key: 'TypeName', type: 'like', value: '', or: true },
      },
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
      this._doSearch(noIndex, {
        before (map) {
          for (let key in map) {
            map[key].value = map.Name.value
          }
          return map
        }
      })
    },
    async getList () {
      this._getList(apiEntityinfo.Read)
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
