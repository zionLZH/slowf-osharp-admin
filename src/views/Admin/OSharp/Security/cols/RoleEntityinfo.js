export default {
  RoleName: {
    title: '角色',
    width: '150px'
  },
  EntityType: {
    title: '数据实体',
    minWidth: '200px',
    render: R => `
      <div>${R.EntityName}</div>
      <div>${R.EntityType}</div>
    `
  },
  Operation: {
    title: '操作',
    width: '80px'
  },
  IsLocked: {
    title: '锁定',
    width: '50px'
  },
  CreatedTime: {
    title: '注册时间',
    width: '180px',
    render: R => R.CreatedTime
  },
  $method: {
    width: '80px'
  }
}
