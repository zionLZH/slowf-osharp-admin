export default {
  UserName: {
    title: '用户昵称',
  },
  RoleName: {
    title: '用户角色'
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
