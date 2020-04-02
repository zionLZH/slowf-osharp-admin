export default {
  Name: {
    title: '功能名称'
  },
  AccessType: {
    title: '功能类型',
    width: '100px',
    vnode: true,
    render: (R, h) => {
      return h('el-tag', {props: {type: ['info', 'primary', 'warning'][R.AccessType]}}, [`${['匿名访问', '登录访问', '角色访问'][R.AccessType]}`])
    }
  },
  Area: {
    title: '区域',
    width: '100px'
  },
  Controller: {
    title: '控制器',
    width: '150px'
  }
}
