<template>
  <slowf-drawer title="功能信息" :show="show" @close="$emit('close')">
    <slowf-form v-loading="loading" label-width="75px">
      <slowf-item label="名称">
        <el-input v-model="form.Name" readonly></el-input>
      </slowf-item>
      <slowf-item label="功能类型">
        <el-select v-model="form.AccessType"></el-select>
      </slowf-item>
      <slowf-item label="操作审计">
        <el-switch v-model="form.AuditOperationEnabled"></el-switch>
      </slowf-item>
      <slowf-item label="数据审计">
        <el-switch v-model="form.AuditEntityEnabled"></el-switch>
      </slowf-item>
      <slowf-item label="缓存秒数">
        <el-input v-model="form.CacheExpirationSeconds" type="number"></el-input>
      </slowf-item>
      <slowf-item label="滑动过期">
        <el-switch v-model="form.IsCacheSliding"></el-switch>
      </slowf-item>
      <slowf-item label="已锁定">
        <el-switch v-model="form.IsLocked"></el-switch>
      </slowf-item>
    </slowf-form>
    <div slot="footer" align="right">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiFunction from '../../../../../api/Osharp/Function'
  import slowfDrawer from 'slowf/components/drawer'
  import slowfForm from 'slowf/components/form'
  import slowfItem from 'slowf/components/item'
  export default {
    props: ['show', 'payload'],
    components: { slowfDrawer, slowfForm, slowfItem },
    data () {
      return {
        loading: false,
        form: {
          Id: '',
          Name: '',
          AccessType: 0,
          AuditOperationEnabled: false,
          AuditEntityEnabled: false,
          CacheExpirationSeconds: 0,
          IsCacheSliding: false,
          IsLocked: false
        }
      }
    },
    watch: {
      payload (val) {
        if (val) {
          let form = JSON.parse(JSON.stringify(val))
          for (let key in this.form) {
            this.form[key] = form[key]
          }
        }
      }
    },
    methods: {
      async doSave () {
        this.loading = true
        try {
          let res = await apiFunction.Update([this.form])
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.$message.success('保存完成')
          this.$emit('close')
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
