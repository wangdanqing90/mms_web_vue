/* eslint-disable eqeqeq */
import axios from 'axios';
import Qs from 'qs';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from '../store/index';
import router from '../router/index';
import { sessionStorage } from '../assets/js/storage';
import str from 'good-storage'

if (!store.state.token) {
  store.commit('SET_TOKEN_0', sessionStorage.getItem('token'));
}
if (!store.state.userId) {
  store.commit('SET_USER_ID_0', sessionStorage.getItem('userId'));
}
// axios 配置

const http = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'access_token': store.state.token,
    'access_id': store.state.userId
  },
  transformRequest: [function (data, headers) {
    if (headers['Content-type'] === 'multipart/form-data') {
      return data;
    } else {
      return Qs.stringify(data);
    }
  }]
});

var loadingInstance;
// 请求拦截器
http.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '正在请求数据...'
  });
  if (store.getters.token) {
    // alert(3)
    config.headers.access_token = store.getters.token
    config.headers.access_id = store.getters.userId
  }

  // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
  if (process.env.NODE_ENV === 'development') {
    const { method } = config;
    if (method === 'post' || method === 'put' || method === 'patch') {
      // console.log(config.data,123);
      str.set('phone',config.data.phone);
    }
  }

  return config;
}, error => {
  loadingInstance.close();
  Message.error({
    message: '请求失败'
  });
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(res => {
  loadingInstance.close();
  if (res.data.statusCode == '200') {
    return res.data;
  } else if (res.data.statusCode == '300') {
    MessageBox.alert('身份信息已过期，请重新登陆', '营销管理平台', {
      confirmButtonText: '重新登陆',
      showClose: false,
      type: 'error',
      callback: action => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      }
    });
    return false;
  } else {
    MessageBox.alert(res.data.message, '营销管理平台', {
      confirmButtonText: '确定',
      showClose: false
    });
    return false;
  }


}, error => {
  loadingInstance.close();
  if (error && error.response) {
    // console.log(error.response);
    switch (error.response.status) {
      // 401 token失效
      case 401:
        MessageBox.alert('身份信息已过期，请重新登陆', '营销管理平台', {
          confirmButtonText: '重新登陆',
          showClose: false,
          type: 'error',
          callback: action => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });
        break;

      // 403 服务器拒绝访问
      case 403:
        router.push('/error/403');
        break;

      // 404 访问的资源不存在
      case 404:
        router.push('/error/404');
        break;

      // 500 服务器错误
      case 500:
        router.push('/error/500');
        break;
    }

    return Promise.reject(error);
  }
});






// 返回一个Promise(发送post请求)
export const fetch = function (url, params, method) {
  method = method || 'post';
  return new Promise((resolve, reject) => {
    var fetch = method === 'post' ? http.post(url, params) : http.get(url, params);
    fetch
        .then(
        res => {
          if (res.statusCode == 200) {
            resolve(res)
          } else {reject(res)}
        },
        err => {
          if (err) {
            Promise.reject(err)
          } else {
              // 请求超时
            // Vue.$toast('请求超时')
            console.log(err,100)
          }
        }
        )
        .catch(error => {
          Promise.reject(error)
        })
  })
}
