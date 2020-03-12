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
    return true
  }
  if (store.state.ModuleData.indexOf(module) >= 0) {
    return true
  } else {
    let modulePath = module.split('.')
    for (let item of store.state.ModuleData) {
      let isPass = true
      for (let i = 0; i < modulePath.length; i++) {
        let query = i == modulePath.length - 1 ? `.${modulePath[i]}` : `.${modulePath[i]}.`
        if (item.indexOf(query) < 0) {
          isPass = false
          break
        }
      }
      if (isPass) {
        return true
        return
      }
    }
    return false
  }
  return true
}
