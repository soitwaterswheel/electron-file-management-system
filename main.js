// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被垃圾回收的时候，window对象将会自动的关闭
let mainWindow

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 载入页面
  // mainWindow.loadFile('./pulic/index.html')
  mainWindow.loadURL('http://localhost:3000')

  // 打开开发者工具
  // win.webContents.openDevTools()
  // 当 window 被关闭，这个事件会被触发。
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) createWindow()
})

