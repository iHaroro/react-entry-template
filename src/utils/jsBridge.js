import { noop, queryToString } from '@/utils/utils'

/**
 * @function 掉用原生协议
 * @description 协议示例：wst://route/route/extParam?xxx=xxx&xxx=xxx
 * name(protocol): wst://route/route 映射key
 * extParam: /extParam，注意默认是没有 "/" 的，如有需要自行入参前添加
 * query: ?xxx=xxx&xxx=xxx
 * @param {string} invokeName 协议名，定义在PROTOCOL_CONFIG常量中的映射key
 * @param {object} query 传给原生的参数
 * @param {string} extParam 跟在协议后的额外Param or Path
 **/
export const AppInvoke = (invokeName, query = {}, extParam = '') => {
  let url = `${invokeName}${extParam}?${queryToString(query)}`
  // location.href = url
  let WebViewJsBridgeIframe = document.createElement('iframe')
  WebViewJsBridgeIframe.style.display = 'none'
  WebViewJsBridgeIframe.src = url
  document.documentElement.appendChild(WebViewJsBridgeIframe)
  // console.log(url)
  setTimeout(() => {
    document.documentElement.removeChild(WebViewJsBridgeIframe)
  }, 0)
}

/**
 * @function 注册全局原生回调js句柄方法
 * @param {string} registerName 协议名
 * @param {any} callback 回调函数
 **/
export const AppRegister = (registerName, callback = noop) => {
  window[registerName] = callback
}

export const AppRegisterSync = (registerName) => new Promise(resolve => {
  window[registerName] = function (data) {
    resolve(data)
  }
})
