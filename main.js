const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const log = require('electron-log')
// const { ipcMain } = require('electron')
// 保持对window对象的全局引用
// 如果不这么做的话，当JavaScript对象被垃圾回收的时候，window对象将会自动的关闭
let mainWindow
// console.log('window.electron.ipcMain\n\n', window.electron.ipcMain)
// window.electron.ipcMain.on('message', (evt, args) => { console.log('??win\n', evt, args) })

log.info('ipcMain\n')
// ipcMain.on('asynchronous-message', (evt, args) => { log.info("ipcMain"); log.info(evt, args) })

app.on('ready', () => {
  require('devtron').install()
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)

  mainWindow.on('closed', function () {
    mainWindow = null
  })

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

