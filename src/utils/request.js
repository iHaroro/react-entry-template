import axios from 'axios'

// 请求实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1500, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => Promise.reject(error))

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  let successFlag = requestHandler(res)
  return successFlag
    ? res.result
    : Promise.reject(res)
}, error => Promise.reject(error))

/**
 * @function 响应数据处理
 * @param {any} res 响应数据
 * @returns {boolean} 业务请求是否成功，根据后端code判断，true：成功，false：失败
 **/
const requestHandler = (res = { errorMsg: undefined }) => {
  let successCodes = [200] // 响应编码，200为正常，其他均为异常状态。注意和http返回编码区分。
  let successFlag = successCodes.includes(+res.code) // 自定义校验
  // TODO UI TOAST
  !successFlag && console.warn(res.errorMsg || '网络繁忙，请重试')
  return successFlag
}

export default service
