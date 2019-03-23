import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'
Vue.use(Toast)
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中...'
    })
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    Toast.clear()
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const requestGet = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}

export const requestPost = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
