<template>
  <slowf-drawer title="用户角色信息" :show="show" @close="$emit('close')">
    <slowf-form v-if="form" v-loading="loading" label-width="75px" label-position="top">
      <slowf-item label="用户">
        {{ form.UserName }}
      </slowf-item>
      <slowf-item label="角色">
        {{ form.RoleName }}
      </slowf-item>
      <slowf-item label="锁定">
        <el-switch v-model="form.IsLocked" active-text="锁定"></el-switch>
      </slowf-item>
    </slowf-form>
    <div slot="footer" align="right">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiUserRole from '../../../../../api/Osharp/UserRole'
  import { ReadNode as RoleReadNode } from '../../../../../api/Osharp/Role'
  import { ReadNode as EntityinfoReadNode } from '../../../../../api/Osharp/Entityinfo'
  import slowfDrawer from 'slowf/components/drawer'
  import slowfForm from 'slowf/components/form'
  import slowfItem from 'slowf/components/item'
  import slowfASelect from 'slowf/components/aSelect'
  import selectOperate from '../../../../../components/select/operate'
  export default {
    props: ['show', 'payload'],
    components: { slowfDrawer, slowfForm, slowfItem, slowfASelect, selectOperate },
    data () {
      return {
        loading: false,
        form: false,
        RoleReadNode,
        EntityinfoReadNode
      }
    },
    watch: {
      payload (val) {
        if (val && val.Id) {
          this.form = JSON.parse(JSON.stringify(val))
        } else {
          this.form = false
        }
      }
    },
    methods: {
      async doSave () {
        this.loading = true
        try {
          let res = await apiUserRole.Update([this.form])
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
