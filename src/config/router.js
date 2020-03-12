import router from '../router'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - OSharp·Slowf'
  }
  if (!store.state.AuthData && !(to.meta && to.meta.pass)) {
    next({ name: 'Login' })
    return false
  }
  next()
})
