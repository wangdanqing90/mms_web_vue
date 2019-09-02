import Vue from 'vue'
import str from 'good-storage'
import store from '../store'
import axios from 'axios'
import qs from 'qs'
import { OK_CODE } from 'api/config'
// import { MessageBox, Message } from 'mint-ui'

// axios的一些全局配置
axios.defaults.timeout = 5000 // 响应时间 
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
// axios.defaults.baseURL = 'http://wap.ql-fh.com/' // 配置接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (store.getters.token) {
      config.headers.token = `${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.code === 1001) {
      str.clear()
      store.dispatch('clearState')
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

// 返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params ? qs.stringify(params) : '')
      .then(
        res => {
          if (res.statusCode === OK_CODE) {
            resolve(res)
          } else reject(res)
        },
        err => {
          if (err.data) {
            reject(err.data)
          } else {
            // 请求超时
            Vue.$toast('请求超时')
          }
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
