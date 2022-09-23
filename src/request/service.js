// 导入axios
import axios from 'axios'
import {ElMessage} from 'element-plus';
// import router from '@/router'
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.NODE_ENV == 'development'?'/test/':'https://api.test.com/',
  // baseURL:'http://192.168.110.116:8000',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 20 * 1000,
  headers: {
     'Content-Type':'application/json', //配置请求头
   }
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换

  const authorization = localStorage.getItem("authorization")//这里取token之前，你肯定需要先拿到token,存一下

  if(authorization){
    config.headers.authorization= authorization; //如果要求携带在请求头中
  }
  return config
}, error => {
  console.log("request error: ",error);
  return Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(res => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  if(res.data.code === 401){
    ElMessage.error(res.data.msg)
    // router.replace('/login')
    return false
  }
  if(res.data.code !== 200){
    console.log("reject: ", res.data);
    return Promise.reject(res.data)
  }
  return Promise.resolve(res.data)
  
}, error => {
  console.log("response error: ",error);
  return Promise.reject(error)
})
//4.导入文件
// export default service

//5、get请求的封装
export function get(url,params={}){
  return new Promise((resolve,reject) => {
      service({
          url:url,
          method:'get',
          params:params
      }).then(res => {
          resolve(res);
      }).catch(err => {
          reject(err);
      })
  })
}

//6、post请求封装  默认json格式:'Content-Type':'application/json',如果是文件上传，可以修改headers为 headers: { 'Content-Type': 'multipart/form-data' }
export function post(url,params={},headers={'Content-Type':'application/json'}){
  return new Promise((resolve,reject) => {
      service({
          url:url,
          method:'post',
          data:params,
          headers: headers
      }).then(res => {
          resolve(res);
      }).catch(err => {
          reject(err);
      })
  })
}
//7、将模块暴露
export default{
  get,
  post
}