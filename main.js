const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// 保持对window对象的全局引用
// 如果不这么做的话，当JavaScript对象被垃圾回收的时候，window对象将会自动的关闭
let mainWindow

function createWindow() {
  // require('devtron').install()


  ipcMain.on('message', (avt, args) => { console.log(evt, args) })
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  // mainWindow.loadFile('./pulic/index.html')
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

