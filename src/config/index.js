import './ajax'
import './router'
import './rms'

import Vue from 'vue'
import dataFormat from 'slowf/utils/dataFormat'

Vue.prototype.routerPath = dataFormat.routerPath
Vue.prototype.typeReformat = dataFormat.typeReformat



