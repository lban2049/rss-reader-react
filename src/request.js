// axios 封装
import axios from 'axios'
import { BaseUrl } from './config'


const service = axios.create({
  baseURL: BaseUrl,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    return config
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success) {
      return res
    } else {
      console.log('err', res)
      alert(res.msg)
      return Promise.reject(res)
    }
  }
)

export default service