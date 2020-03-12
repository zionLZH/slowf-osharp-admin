import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/normalize.css'
import ElementUI from 'element-ui'
import './style/el-theme/theme/index.css'
import './config/index.js'

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
