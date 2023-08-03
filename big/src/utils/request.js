// 基于axios封装网络请求
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {Message} from 'element-ui'
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myaxios = axios.create({
  baseURL
})


//请求拦截器
myaxios.interceptors.request.use(function(config) {
  //请求之前会触发一次
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  } 
  return config
}, function(error) {
  return Promise.reject(error)
  //请求发起前的代码,如果有异常报错,会直接进入这里
  //返回一个拒绝状态的promise对象,原地留下,等于return new promise
})

//响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response 
},function(error) {
  if (error.response.status === 401) {
    store.commit('updateToken','')
    store.commit('updateUserInfo','')
    router.push('/login')
    Message.error('用户身份已过期!!')
  }
  return Promise.reject(error)
})
export default myaxios
