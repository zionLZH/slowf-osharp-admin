export default {
  Name: {
    title: '名称',
    fixed: 'left',
    width: '200px'
  },
  AccessType: {
    title: '功能类型',
    width: '100px',
    vnode: true,
    render: (R, h) => {
      return h('el-tag', { props: { type: ['info', 'primary', 'warning'][R.AccessType] } }, [`${['匿名访问', '登录访问', '角色访问'][R.AccessType]}`])
    }
  },
  AuditOperationEnabled: {
    title: '操作审计',
    width: '80px'
  },
  AuditEntityEnabled: {
    title: '数据审计',
    width: '80px'
  },
  CacheExpirationSeconds: {
    title: '缓存秒数',
    width: '80px'
  },
  IsCacheSliding: {
    title: '滑动过期',
    width: '80px'
  },
  IsLocked: {
    title: '锁定',
    width: '80px'
  },
  IsAjax: {
    title: 'Ajax访问',
    width: '80px'
  },
  IsController: {
    title: '控制器',
    width: '80px'
  },
  Area: {
    title: '区域',
    width: '100px'
  },
  Controller: {
    title: '控制器',
    minWidth: '150px'
  },
  Action: {
    title: '功能方法',
    minWidth: '150px'
  },
  $method: {
    width: '80px'
  }
}
