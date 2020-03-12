import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AuthData: false,
    ModuleData: []
  },
  mutations: {
    updateAuthData (state, payload) {
      state.AuthData = payload
    },
    updateModuleData (state, payload) {
      state.ModuleData = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
