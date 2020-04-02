export default {
  Name: {
    title: '名称',
    width: '150px'
  },
  Remark: {
    title: '备注',
    minWidth: '150px'
  },
  IsAdmin: {
    title: '管理角色',
    width: '50px'
  },
  IsDefault: {
    title: '默认角色',
    width: '50px'
  },
  IsLocked: {
    title: '锁定',
    width: '50px'
  },
  CreatedTime: {
    title: '创建时间',
    width: '180px',
    render: R => R.CreatedTime
  },
  $method: {
    width: '80px'
  }
}
