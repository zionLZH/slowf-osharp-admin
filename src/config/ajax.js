import store from '../store'
import axios from 'axios'
import { Alert } from "element-ui"
import { Token } from '../api/Osharp/Identity'
let isRefreshing = false

axios.interceptors.request.use(config => {
  if ((config.baseURL + '').indexOf('/api') !== 0) {
    config.baseURL = '/api' + config.baseURL
  }
  if (store.state.AuthData) {
    config.headers = config.headers || {}
    config.headers.Authorization = ` Bearer ${store.state.AuthData.AccessToken}`
  }
  return config
})

axios.interceptors.response.use(res => res, async err => {
  if (err.response.status === 401) {
    try {
      await refreshToken()
      let config = err.config
      config.headers.Authorization = ` Bearer ${store.state.AuthData.AccessToken}`
      let res = await new axios(config)
      return Promise.resolve(res)
    } catch (e) {
      await Alert('请重新登录')
      store.commit('updateAuthData', false)
      document.body.remove()
      location.reload()
      return Promise.reject(err)
    }
  }
})

async function Refreshing () {
  return new Promise(resolve => {
    let timer = setInterval(e => {
      if (!isRefreshing) {
        clearInterval(timer)
        resolve()
      }
    }, 1)
  })
}

async function refreshToken () {
  if (isRefreshing) {
    await Refreshing()
    return Promise.resolve()
  }
  isRefreshing = true
  try {
    let RefreshUctExpires = store.state.AuthData.RefreshUctExpires,
        RefreshToken = store.state.AuthData.RefreshToken,
        CurrentTimeStamp = new Date().getTime()
    if (CurrentTimeStamp >= RefreshUctExpires) {
      return Promise.reject()
    } else {
      try {
        let res = await Token({ grantType: 'refresh_token', refreshToken: RefreshToken })
        if (res.Content && res.Type !== 200) {
          throw res.Content
        }
        store.commit('updateAuthData', res.Data)
        isRefreshing = false
        return Promise.resolve()
      } catch (e) {
        return Promise.reject()
      }
    }
  } catch (e) {
    return Promise.reject()
  }
}
