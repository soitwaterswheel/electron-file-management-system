const electron = require('electron')
const path = require('path')
const { app, BrowserWindow, remote, Menu, MenuItem, dialog, Tray } = electron

let mainWindow
// 托盘对象
let appTray = null
var trayMenuTemplate = [{
  label: '设置',
  click: function () { } //打开相应页面
}, {
  label: '帮助',
  click: function () { }
}, {
  label: '关于',
  click: function () { }
}, {
  label: '退出',
  click: function () {
    //ipc.send('close-main-window');
    app.quit();
  }
}
];

// 顶部菜单模板
let template = [{
  label: '编辑',
  submenu: [{
    label: '撤销',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '重做',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '复制',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '粘贴',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [
    {
      label: '学习更多',
      click: function () {
        electron.shell.openExternal('https://www.electronjs.org/')
      }
    }, {
      label: '关于作者',
      click: function () {
        electron.shell.openExternal('https://github.com/soitwater')
      }
    }, {
      label: '打开控制台',
      click: function () {
        mainWindow.webContents.openDevTools();
      }
    }
  ]
}]
const ipc = electron.ipcMain
// 右键上下文菜单
const menu = new Menu()
menu.append(new MenuItem({ label: 'Hello' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))
// 监听右键上下文
app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
})
ipc.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  // 顶部工具栏载入
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  // 页面内容载入
  const urlLocation = 'http://localhost:3000'
  mainWindow.loadURL(urlLocation)
  // 托盘
  let trayIcon = path.join(__dirname, "tray")
  appTray = new Tray(path.join(trayIcon, "icon.ico"))
  const trayContextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  appTray.setToolTip("this is my application")
  appTray.setContextMenu(trayContextMenu)
  // 关闭
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
