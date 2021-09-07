import axios from 'axios'
import { sign, JSON_METHODS } from './sign'

// 请求实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1500, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  const method = config.method.toUpperCase() // 统一大小写
  // 公共参数
  const commonParams = {
    userId: '1234567890',
    chnl: 'eggApp', // 渠道来源
    cliTime: Date.now(), // 当前时间戳
    curVer: '0.0.1', // 应用版本
    platform: 3, // 平台类型：1:ANDROID,2:IOS,3:WEB,4:快应用,5:小程序,
    srcApp: 'egg_web', // 请求来源的应用编码
  }
  // 请求加签 START
  if (JSON_METHODS.includes(method)) {
    let data = {
      ...commonParams,
      ...config.data,
    }
    config.header = {
      'Content-Type': 'application/json;',
    }
    config.url += `${/\?/.test(config.url) ? '&' : '?'}sign=${sign(data, method)}`
    // body json data
    config.data = data
  } else {
    let data = {
      ...commonParams,
      ...config.params,
    }
    data.sign = sign(data, method)
    // query string data
    config.params = data
  }
  // 请求加签 END
  return config
}, error => Promise.reject(error))

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  let successFlag = requestHandler(res)
  return successFlag
    ? res.result
    : Promise.reject(res.errorMsg)
}, error => Promise.reject(error))

/**
 * @function 响应数据处理
 * @param {any} res 响应数据
 * @returns {boolean} 业务请求是否成功，根据后端code判断，true：成功，false：失败
 **/
const requestHandler = (res = { errorMsg: undefined }) => {
  let successCodes = [200] // 响应编码，200为正常，其他均为异常状态。注意和http返回编码区分。
  let successFlag = successCodes.includes(+res.code)
  // TODO UI TOAST
  !successFlag && console.warn(res.errorMsg || '网络繁忙，请重试')
  return successFlag
}

export default service
