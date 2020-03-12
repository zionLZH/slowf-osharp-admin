import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuRouteOption from './menu'
import PublicRouteOption from './public'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/osharp/identity/user' }
].concat(MenuRouteOption).concat(PublicRouteOption).concat([
  { path: '*', name: 'ErrPage', component: () => import('../views/Public/ErrPage'), meta: { title: '访问出错', pass: true } },
])

const router = new VueRouter({
  routes
})

export default router
