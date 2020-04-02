export default {
  UserName: {
    title: '用户名',
    minWidth: '150px'
  },
  NickName: {
    title: '昵称',
    minWidth: '150px'
  },
  Email: {
    title: '邮箱',
    width: '150px'
  },
  EmailConfirmed: {
    title: '邮箱验证',
    width: '50px'
  },
  PhoneNumber: {
    title: '手机号',
    width: '120px'
  },
  PhoneNumberConfirmed: {
    title: '手机验证',
    width: '50px'
  },
  Roles: {
    title: '角色',
    width: '150px',
    render: R => (R || []).Roles.join(',')
  },
  IsLocked: {
    title: '账号锁定',
    width: '50px'
  },
  LockoutEnabled: {
    title: '登陆锁',
    width: '50px'
  },
  AccessFailedCount: {
    title: '登陆错误',
    width: '80px'
  },
  LockoutEnd: {
    title: '锁时间',
    width: '180px',
    render: R => R.LockoutEnd || ''
  },
  CreatedTime: {
    title: '注册时间',
    width: '180px',
    render: R => R.CreatedTime || ''
  },
  $method: {
    width: '80px'
  }
}
