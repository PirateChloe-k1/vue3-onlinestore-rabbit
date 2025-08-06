// axios基础的封装
import axios from "axios";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus";

const httpInstance = axios.create({
    //根域名
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    //超时时间
    timeout: 5000
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance