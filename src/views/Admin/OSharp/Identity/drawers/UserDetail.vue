<template>
  <slowf-drawer title="用户信息" size="360px" :show="show" @close="$emit('close')">
    <slowf-form v-if="form" v-loading="loading" label-width="75px" label-position="top">
      <slowf-item label="Id">
        {{ form.Id || '自动生成' }}
      </slowf-item>
      <slowf-item label="用户名">
        <el-input v-model="form.UserName"></el-input>
      </slowf-item>
      <slowf-item label="密码">
        <el-input type="password" v-model="form.Password"></el-input>
      </slowf-item>
      <slowf-item label="昵称">
        <el-input v-model="form.NickName"></el-input>
      </slowf-item>
      <slowf-item label="邮箱">
        <el-input v-model="form.Email"></el-input>
        <el-switch v-model="form.EmailConfirmed" active-text="邮箱确认"></el-switch>
      </slowf-item>
      <slowf-item label="手机号">
        <el-input v-model="form.PhoneNumber"></el-input>
        <el-switch v-model="form.PhoneNumberConfirmed" active-text="邮箱确认"></el-switch>
      </slowf-item>
      <slowf-item label="锁定">
        <el-switch v-model="form.IsLocked" active-text="锁定"></el-switch>
      </slowf-item>
      <slowf-item label="登陆错误次数">
        {{ form.AccessFailedCount || 0 }}
      </slowf-item>
      <slowf-item label="登陆锁">
        <el-switch v-model="form.LockoutEnabled" active-text="登陆锁"></el-switch>
      </slowf-item>
      <slowf-item label="锁时间">
        <el-date-picker type="datetime" style="width: 100%" v-model="form.LockoutEnd" data-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </slowf-item>
    </slowf-form>
    <div slot="footer" align="right">
        <el-button type="primary" @click="doSave">保 存</el-button>
        <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiUser from '../../../../../api/Osharp/User'
  import { ReadNode as UserReadNode } from '../../../../../api/Osharp/User'
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
        UserReadNode,
        EntityinfoReadNode
      }
    },
    watch: {
      payload (val) {
        if (val && val.Id) {
          this.form = JSON.parse(JSON.stringify(val))
        } else {
          this.form = { id: 0, UserName: '', NickName: '', Password: '', Email: '', EmailConfirmed: false, PhoneNumber: '', PhoneNumberConfirmed: false, LockoutEnabled: false, IsLocked: false }
        }
      }
    },
    methods: {
      async doSave () {
        this.loading = true
        try {
          let apier = this.form.Id ? apiUser.Update : apiUser.Create
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
