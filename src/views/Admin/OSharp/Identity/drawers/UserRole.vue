<template>
  <slowf-drawer title="用户角色" size="400px" :show="show" @close="$emit('close')">
    <div v-loading="loading">
      <el-checkbox-group v-model="checkes">
        <div  v-for="(item, index) in list" :key="item.Id" style="margin-bottom: 15px">
          <el-checkbox :label="item.Id">{{item.Name}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div slot="footer" align="right">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiRole from '../../../../../api/Osharp/Role'
  import * as apiUser from '../../../../../api/Osharp/User'
  import slowfDrawer from 'slowf/components/drawer'
  import dataFormatUtils from 'slowf/utils/dataFormat'
  export default {
    props: ['show', 'payload'],
    components: { slowfDrawer },
    data () {
      return {
        loading: false,
        list: [],
        checkes: []
      }
    },
    watch: {
      payload (val) {
        this.list = []
        this.checkes = []
        if (val && val.Id) {
          this.getDetail()
        }
      }
    },
    methods: {
      async getDetail () {
        this.loading = true
        try {
          let res = await apiRole.ReadUserRoles(this.payload.Id)
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.list = res
          for (let item of res) {
            item.IsChecked && this.checkes.push(item.Id)
          }
        } catch (e) {
          console.error(e)
          this.$message.error(typeof e === 'string' ? e : '请求失败')
        }
        this.loading = false
      },
      async doSave () {
        this.loading = true
        try {
          let res = await apiUser.SetRoles({ userId: this.payload.Id, roleIds: this.checkes })
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
