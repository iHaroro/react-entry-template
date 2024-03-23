// DEMO
import React from 'react'
import CommonRouter from '@components/CommonRouter'
import { routes } from './router'
import './App.scss'

export default function App () {
  return <CommonRouter routes={routes} />
}
