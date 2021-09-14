import React, { useState, useEffect } from 'react'
import { demo1ApiServer, demo2ApiServer, demo3ApiServer, demo4ApiServer } from '@/api/demo'

export default function DependRequest () {
  const [userInfo, setUserInfo] = useState(null)
  const [vip, setVip] = useState(null)
  const [level, setLevel] = useState(null)
  const [config, setConfig] = useState(null)

  useEffect(() => {
    demo1ApiServer().then(res => {
      console.log(res)
      setUserInfo(res)
    })
    demo2ApiServer().then(res => {
      console.log(res)
      setVip(res)
    })
    demo3ApiServer().then(res => {
      console.log(res)
      setLevel(res)
    })
    demo4ApiServer().then(res => {
      console.log(res)
      setConfig(res)
    })
  }, [])

  return (<>
    <div>{JSON.stringify(userInfo)}</div>
    <div>{JSON.stringify(vip)}</div>
    <div>{JSON.stringify(level)}</div>
    <div>{JSON.stringify(config)}</div>
  </>)
}
