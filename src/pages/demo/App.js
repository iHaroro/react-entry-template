// DEMO
import React from 'react'
import CommonRouter from '@/components/CommonRouter'
import { routes } from './router'
import './App.scss'
import service from '@/utils/request'

export default function App () {
  service({
    url: '/api/user/my',
    method: 'GET',
    params: { a: 1 },
    data: { b: 1 },
  }).then(res => {
    console.log('success', res)
  }).catch(err => {
    console.log('error', err)
  }).finally(() => {
    console.log('finally')
  })
  return <CommonRouter routes={routes} />

}

