import md5 from 'js-md5'

// 盐值
export const apiSignKey = 'auS7mOS6rOS4nOWNoeaYr+WQpumqhOWCsuS6huenr+WIhuesrOS4ieaetuS6hu+8m+WPkeeahOW/q+S5kOaSkui3r+mZhOi/keaJk+atu+S6hmpmZHNhOTNkc2FmZHNhNTRkZjY4M2ZkMWFzMzPlpKczZGYx5ZWK'
// 需要处理body，query的方法
export const JSON_METHODS = ['POST', 'PUT']
// 签名加盐
export const sign = (param = {}, method) => {
  method = method.toUpperCase()
  if (JSON_METHODS.includes(method)) return md5(JSON.stringify(param) + apiSignKey)
  let buff = '', arr = (Object.keys(param)).sort()
  arr.forEach(paramKey => {
    const value = param[paramKey]
    if (typeof value === 'undefined') {
      buff += `${paramKey}=`
    } else {
      buff += `${paramKey}=${value}`
    }
  })
  return md5(`${buff}${apiSignKey}`)
}
