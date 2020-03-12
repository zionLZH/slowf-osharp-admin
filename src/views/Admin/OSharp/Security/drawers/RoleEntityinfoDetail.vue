<template>
  <slowf-drawer title="数据权限信息" size="700px" :show="show" @close="$emit('close')">
    <slowf-form v-if="form" v-loading="loading" label-width="75px" label-position="top">
      <slowf-item label="角色">
        <slowf-a-select style="width: 100%" v-model="form.RoleId" :dataer="RoleReadNode" :data-formatter="R => R" value-key="RoleId" label-key="RoleName"></slowf-a-select>
      </slowf-item>
      <slowf-item label="数据实体">
        <slowf-a-select style="width: 100%" v-model="form.RoleName" :dataer="EntityinfoReadNode" :data-formatter="R => R" value-key="Id" label-key="Name"></slowf-a-select>
      </slowf-item>
      <slowf-item label="操作">
        <select-operate style="width: 100%" v-model.number="form.Operation"></select-operate>
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
  import * as apiRoleEntity from '../../../../../api/Osharp/RoleEntity'
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
          this.form = { Id: '', RoleId: '', RoleName: '', Operation: 0, IsLocked: false }
        }
      }
    },
    methods: {
      async doSave () {
        this.loading = true
        try {
          let apier = this.form.Id ? apiRoleEntity.Update : apiRoleEntity.Create
          let res = await apier([this.form])
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
