import initRMS from 'slowf/utils/rms'
import router from '../router'
import store from '../store'
initRMS({
  router,
  routerHook (to, from, next) {
    if (to.meta.module) {
      let module = to.meta.module
      if (checkModule(module)) {
        next()
      } else {
        next({ name: 'ErrPage' })
      }
      return false
    }
    next()
  },
  rms (value) {
    return checkModule(value)
  }
})

function checkModule (module) {
  if (store.state.ModuleData.length == 0) {
    return false
  }
  if (store.state.ModuleData.indexOf(module) >= 0) {
    return true
  } else {
    for (let item of store.state.ModuleData) {
      if (item.replace(`.${module}`,'!').substr(-1, 1) === '!') {
        return true
      }
    }
    return false
  }
  return true
}
