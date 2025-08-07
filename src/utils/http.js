// axios基础的封装
import axios from "axios";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const httpInstance = axios.create({
    //根域名
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    //超时时间
    timeout: 5000
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1.从pinia获取数据
  const userStore = useUserStore()
  //2.按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //  401token失效处理
  //  1.清除本地用户数据
  //  2.跳转到登录页面
  if(e.response.status === 401){
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance