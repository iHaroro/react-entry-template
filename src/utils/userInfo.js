import { PROTOCOL_CONFIG, HANDLER_CONFIG } from '@/constants/protocol'
import { AppInvoke, AppRegisterSync } from '@/utils/jsBridge'

// token装
export let userInfo = {
  token: '12345',
}

export const getTokenFormApp = async () => {
  return new Promise(resolve => {

    // 注册回调协议
    AppRegisterSync(HANDLER_CONFIG.GET_TOKEN_HANDLER).then(token => {
      console.log('获取原生Token：', token)
      userInfo.token = token
      resolve(token)
    })
    // 调用原生协议
    AppInvoke(PROTOCOL_CONFIG.GET_TOKEN)
    // 模拟原生调用
    setTimeout(() => {
      window[HANDLER_CONFIG.GET_TOKEN_HANDLER]('10086')
    }, 1000)
  })
}
