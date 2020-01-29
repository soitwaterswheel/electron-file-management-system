const { app, BrowserWindow, remote } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  const urlLocation = 'http://localhost:3000'
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
