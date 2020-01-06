import React, { Component, useEffect, useState } from 'react';
import Content from '../Home/components/content.js'
import { Button } from 'antd';
import axios from 'axios'

import useMouseTracker from './useMouseTracker.js'
const ipcRenderer = window.electron.ipcRenderer
// const { ipcRenderer } = require('electron')
// const { BrowserWindow } = require('electron').remote

// let win = new BrowserWindow({ width: 800, height: 600 })
// win.loadURL("https://baidu.com")

const fs = window.require('fs')
// console.log('ipcReender\n\n', ipcRenderer, window.electron.ipcMain)
const Test = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const position = useMouseTracker()

  useEffect(() => {
    setLoading(true)
    // axios.get('https://dog.ceo/api/breeds/image/random')
    //   .then(r => {
    //     console.log(r.data.message)
    //     setUrl(r.data.message)
    //     setLoading(false)
    //   })
  }, [fetch]) // 只有当 fetch 变量改变时,才会触发 useEffect 的回调操作

  return (
    <Content>
      <h1>{position.x}; {position.y}</h1>
      <Button onClick={() => { setFetch(!fetch) }}>下一张</Button>
      <Button onClick={() => { console.log('??-??'); ipcRenderer.sendSync('message', 'ipc: test to main.js') }}> ipc</Button>
      {loading ? <p>loading ...</p> : <img alt="dog" src={url} style={{ width: '200px' }}></img>}
    </Content>
  )
}
export default Test