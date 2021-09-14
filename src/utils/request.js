import axios from 'axios'
import { getTokenFormApp } from '@/utils/userInfo'

// 是否正在刷新Token
let isRefreshToken = false

// 请求重试队列
let retryQueues = []

// 请求实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;',
  }
})

// 请求拦截器
service.interceptors.request.use(async config => {
  commonParamsHandler(config)
  return config
}, error => Promise.reject(error))

// 响应拦截器
service.interceptors.response.use(async response => {
  const res = response.data
  // 常规业务状态码判断
  let successFlag = isRequestSuccess(res)
  if (successFlag) { // 业务成功
    return res.result
  } else { // 业务失败 Business Error
    return handlerBusinessError(response)
  }
}, error => Promise.reject(error))

/**
 * @function 处理业务请求通用参数
 * @description 包扩通用参数、验签等
 * @param {object} config axios配置
 **/
const commonParamsHandler = config => {
  config.data = config.data || {}
  config.params = config.params || {}
  // 请求公共参数...
  // ...
}

/**
 * @function 响应数据处理
 * @param {any} res 响应数据
 * @returns {boolean} 业务请求是否成功，根据后端code判断，true：成功，false：失败
 **/
const isRequestSuccess = (res = { errorMsg: undefined }) => {
  let successCodes = [200] // 响应编码，200为正常，其他均为异常状态。注意和http返回编码区分。
  return successCodes.includes(+res.code)
}

/**
 * @function 处理异常集合
 * @param {Object} response axios 完整响应
 * @returns {Promise} 返回请求service or 异常reject
 **/
const handlerBusinessError = async response => {
  let { data: { code } } = response
  switch (code) {
    case 401: // token失效
      let { config } = response
      if (!isRefreshToken) {
        isRefreshToken = true // 锁定后续请求
        // 获取新token的操作
        const token = await getTokenFormApp()
        // TODO 做获取更新config 请求中的 token 的操作
        retryQueues.forEach(request => request(token))
        retryQueues = []
        isRefreshToken = false
        return service(config)
      } else {
        return new Promise(resolve => {
          retryQueues.push(token => {
            // TODO 做获取更新config 请求中的 token 的操作
            resolve(service(config))
          })
        })
      }
    default:
      return Promise.reject()
  }
}

export default service
