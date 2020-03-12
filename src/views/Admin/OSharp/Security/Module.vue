<template>
  <slowf-block v-loading="loading">
    <div class="custom-tree-node" style="padding: 10px 0 10px 24px;border-bottom: 1px solid #eee">
      <div>名称</div>
      <div>备注</div>
      <div>代码</div>
      <div>排序</div>
    </div>
    <el-tree
      :data="list">
      <span class="custom-tree-node" slot-scope="{ node, data }" :style="{ marginLeft: - getWidthFix(node) + 'px' }">
        <span :style="{ paddingLeft: getWidthFix(node) + 'px' }">
          <el-link type="primary" @click.stop="showDetail=data">{{data.Name}}</el-link>
        </span>
        <span>{{ data.Remark }}</span>
        <span>{{ data.Code }}</span>
        <span>{{ data.OrderCode }}</span>
      </span>
    </el-tree>
    <drawer-detail :show="showDetail" :payload="showDetail" @close="showDetail=false"></drawer-detail>
  </slowf-block>
</template>

<script>
import  * as apiModule from '../../../../api/Osharp/Module'
import $O from 'slowf/utils/osharp'
import dataFormatUtils from 'slowf/utils/dataFormat'
import slowfBlock from 'slowf/components/block'
import slowfTable from 'slowf/components/table'
import slowfPager from 'slowf/components/pager'
import drawerDetail from './drawers/ModuleDetail'
export default {
  components: {
    slowfBlock, slowfTable, slowfPager, drawerDetail },
  data () {
    return {
      loading: false,
      list: [],
      showDetail: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      try {
        let submitData = new $O().pageIndex(1).pageSize(10).gen()
        let res = await apiModule.Read(submitData)
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        this.list = dataFormatUtils.zTreeToTree(res, { id: 'Id', ParentId: 'ParentId', children: 'children' })
      } catch (e) {
        console.error(e)
        this.$message.error(typeof e === 'string' ? e : '请求失败')
      }
      this.loading = false
    },
    tableCMD (item, cmd) {
      switch (cmd) {
        case 'Module':
          this.showModules = item
          break
      }
    },
    getWidthFix (node) {
      return (node.level - 1) * 18
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  width: 100%;
  display: flex;
  &>* {
    flex: 0;
    box-sizing: border-box;
    min-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-last-child(2) {
      min-width: 250px;
    }
    &:nth-last-child(1) {
      min-width: 50px;
    }
  }
}
</style>
