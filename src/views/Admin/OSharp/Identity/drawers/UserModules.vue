<template>
  <slowf-drawer title="权限管理" size="400px" :show="show" @close="$emit('close')">
    <div v-loading="loading">
      <el-tree ref="tree" :data="list" :props="{ label: 'Name', children: 'Children' }" node-key="Id" :default-checked-keys="checkes" show-checkbox @check-change="onNodeCheck"></el-tree>
    </div>
    <div slot="footer" align="right">
      <el-button type="primary" @click="doSave">保 存</el-button>
      <el-button @click="$emit('close')">关 闭</el-button>
    </div>
  </slowf-drawer>
</template>

<script>
  import * as apiModule from '../../../../../api/Osharp/Module'
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
      async checksCalc (item) {
        let arr = []
        if (item.IsChecked) {
          arr.push(item.Id)
        }
        if (item.Children) {
          for (let sItem of item.Children) {
            arr = arr.concat(await this.checksCalc(sItem))
          }
        }
        return arr
      },
      onNodeCheck (item, isCheck) {
        // if (isCheck) {
        //   this.checkes.push(item.Id)
        // } else {
        //   this.checkes.splice(this.checkes.indexOf(item.Id), 1)
        // }
      },
      async getDetail () {
        this.loading = true
        try {
          let res = await apiModule.ReadUserModules(this.payload.Id)
          if (res.Content && res.Type !== 200) {
            throw res.Content
          }
          this.list = res
          let arr = []
          for (let item of res) {
            arr = arr.concat(await this.checksCalc(item))
          }
          this.checkes = arr
        } catch (e) {
          console.error(e)
          this.$message.error(typeof e === 'string' ? e : '请求失败')
        }
        this.loading = false
      },
      async doSave () {
        this.loading = true
        try {
          let res = await apiUser.SetModules({ userId: this.payload.Id, moduleIds: this.$refs.tree.getCheckedKeys() })
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
