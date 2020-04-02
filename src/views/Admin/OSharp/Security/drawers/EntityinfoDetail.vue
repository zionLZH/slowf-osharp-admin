<template>
  <slowf-drawer title="实体信息" size="600px" :show="show" @close="$emit('close')">
    <slowf-form v-loading="loading" label-width="75px">
      <slowf-item label="实体名称">
        {{form.Name}}
      </slowf-item>
      <slowf-item label="实体类型">
        {{form.TypeName}}
      </slowf-item>
      <slowf-item label="数据审计">
        <el-switch v-model="form.AuditEnabled"></el-switch>
      </slowf-item>
    </slowf-form>
    <div slot="footer" align="right">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiEntityinfo from '../../../../../api/Osharp/Entityinfo'
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
          TypeName: 0,
          AuditEnabled: false
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
          let res = await apiEntityinfo.Update([this.form])
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
