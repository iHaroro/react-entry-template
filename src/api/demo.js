import request from '@/utils/request'

export const demo1ApiServer = data => request({
  url: '/api/user/getInfo',
  method: 'GET',
  params: data,
})
export const demo2ApiServer = data => request({
  url: '/api/user/getVip',
  method: 'GET',
  params: data,
})
export const demo3ApiServer = data => request({
  url: '/api/user/getLevel',
  method: 'GET',
  params: data,
})
export const demo4ApiServer = data => request({
  url: '/api/user/getConfig',
  method: 'GET',
  params: data,
})
