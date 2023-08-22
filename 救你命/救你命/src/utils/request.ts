import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use((config) => {
      let userStore = useUserStore()
      if (userStore.userinfo.value) {
            config.headers.token = userStore.userinfo.value.token
      }
    return config
})

request.interceptors.response.use((response) => {
    return response
}, (error) => {
    let status = error
    switch (status) {
          case 404:
                //错误提示信息
                ElMessage({
                      type: 'error',
                      message: '请求失败路径出现问题'
                })
                break;
          case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                      type: 'error',
                      message: '服务器挂了'
                })
                break;
          case 401:
                ElMessage({
                      type: 'error',
                      message: '参数有误'
                })
                break;
    }
    return Promise.reject(new Error(error.message))
})

export default request