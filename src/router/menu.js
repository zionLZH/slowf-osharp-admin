import Layout from '../layout/layout'
import Blank from 'slowf/layout/blank'
export default [
  {
    path: '/osharp/identity',
    name: 'OsharpIdentity',
    meta: { title: '身份认证', icon: 'el-icon-user-solid' },
    component: Layout,
    children: [
      { path: 'user', name: 'OsharpIdentityUser', component: () => import('../views/Admin/OSharp/Identity/User'), meta: { title: '用户管理', module: 'User.Read' } },
      { path: 'role', name: 'OsharpIdentityRole', component: () => import('../views/Admin/OSharp/Identity/Role'), meta: { title: '角色管理', module: 'Role.Read' } },
      { path: 'userRole', name: 'OsharpIdentityUserRole', component: () => import('../views/Admin/OSharp/Identity/UserRole'), meta: { title: '用户角色管理', module: 'UserRole.Read' } },
    ]
  },
  {
    path: '/osharp/security',
    name: 'OsharpSecurity',
    meta: { title: '权限安全', icon: 'el-icon-s-help' },
    component: Layout,
    children: [
      { path: 'module', name: 'OsharpSecurityModule', component: () => import('../views/Admin/OSharp/Security/Module'), meta: { title: '模块管理', module: 'Module.Read' } },
      { path: 'function', name: 'OsharpSecurityFunction', component: () => import('../views/Admin/OSharp/Security/Function'), meta: { title: '功能管理', module: 'Function.Read' } },
      { path: 'entityinfo', name: 'OsharpSecurityEntityinfo', component: () => import('../views/Admin/OSharp/Security/Entityinfo'), meta: { title: '数据实体管理', module: 'EntityInfo.Read' } },
      { path: 'roleRntityinfo', name: 'OsharpSecurityRoleEntityinfo', component: () => import('../views/Admin/OSharp/Security/RoleEntityinfo'), meta: { title: '数据权限管理', module: 'RoleEntity.Read' } },
    ]
  },
  {
    path: '/osharp/systems',
    name: 'OsharpSystems',
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    component: Layout,
    children: [
      { path: 'auditOperation', name: 'OsharpSystemsAuditOperation', component: () => import('../views/Admin/OSharp/Systems/AuditOperation'), meta: { title: '操作审计' } },
      { path: 'auditEntity', name: 'OsharpSystemsAuditEntity', component: () => import('../views/Admin/OSharp/Systems/AuditEntity'), meta: { title: '数据审计' } },
      { path: 'pack', name: 'OsharpSystemsPack', component: () => import('../views/Admin/OSharp/Systems/Pack'), meta: { title: '模块包' } },
    ]
  }
]
