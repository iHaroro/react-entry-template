import request from '@/utils/request'

export const demoApiServer = data => request({
  url: '/api/user/my',
  method: 'GET',
  params: data,
})
