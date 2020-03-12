<template>
  <slowf-drawer size="600px" title="操作详情" :show="show" @close="$emit('close')">
    <template v-if="detail">
      <div v-for="(item,index) in detail" :key="index" style="border-bottom: 1px solid #eee;">
        <slowf-block>
          <template slot="header">数据审计</template>
          <slowf-form label-width="75px">
            <slowf-item label="实体名称">{{item.Name}}</slowf-item>
            <slowf-item label="实体类型">{{item.TypeName}}</slowf-item>
            <slowf-item label="数据编号">{{item.EntityKey}}</slowf-item>
            <slowf-item label="操作类型">{{item.OperateType}}</slowf-item>
          </slowf-form>
        </slowf-block>
        <slowf-block style="margin-top: 10px">
          <template slot="header">数据属性变更明细</template>
          <slowf-form label-position="top">
            <slowf-item v-for="pItem in item.Properties" :key="pItem.FieldName" :label="`${pItem.DisplayName}[${pItem.FieldName}] - ${pItem.DataType}`">
              <span style="color: red">{{pItem.NewValue}}</span>
            </slowf-item>
          </slowf-form>
        </slowf-block>
      </div>
    </template>
  </slowf-drawer>
</template>

<script>
  import * as apiAuditEntity from '../../../../../api/Osharp/AuditEntity'
  import $O from 'slowf/utils/osharp'
  import slowfDrawer from 'slowf/components/drawer'
  import slowfBlock from 'slowf/components/block'
  import slowfForm from 'slowf/components/form'
  import slowfItem from 'slowf/components/item'
  export default {
    props: ['show', 'payload'],
    components: { slowfDrawer, slowfForm, slowfItem, slowfBlock },
    data () {
      return {
        loading: false,
        detail: false
      }
    },
    watch: {
      payload (val) {
        this.detail = false
        val && this.getDetail()
      }
    },
    methods: {
      async getDetail () {
        this.loading = true
        try {
          let submitData = new $O().pageIndex(1).pageSize(999).and($O.data('OperationId', '=', this.payload.Id)).gen()
          let res = await apiAuditEntity.Read(submitData)
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.detail = res.Rows
        } catch (e) {
          console.error(e)
          this.$message.error(typeof e === 'string' ? e : '请求失败')
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
