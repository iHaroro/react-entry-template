/**
 * @function query 转 queryString {a: 1, b: 2, c: 3} ---> a=1&b=2&c=3
 * @param {object} query 参数
 * @returns {string} queryString ---> a=1&b=2&c=3
 **/
export const queryToString = (query) => Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

// 空函数
export function noop () {}
