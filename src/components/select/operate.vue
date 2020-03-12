<template>
  <slowf-select :list="list" :ids="value" label-key="Name" value-key="Id" @change="$emit('change', $event)"></slowf-select>
</template>

<script>
  import slowfSelect from 'slowf/components/select'
  export default {
    props: ['value'],
    model: {
      prop: 'value',
      event: 'change'
    },
    components: { slowfSelect },
    data () {
      return {
        list: [
          { Id: 0, Name: '读取' },
          { Id: 1, Name: '更新' },
          { Id: 2, Name: '删除' },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
