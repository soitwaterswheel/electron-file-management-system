const electron = window.electron
const fsExtra = window.requireNodeJSModule.fsExtra
const APP = electron.remote.app
const STORE_PATH = APP.getPath('userData')
const path = window.path

let low = window.requireNodeJSModule.lowdb
const lowdbFileSync = window.requireNodeJSModule.lowdbFileSync
const adapter = new lowdbFileSync(path.join(STORE_PATH, '/userdata.json'))
const db = low(adapter)


// 生产环境下第一次使用本应用,将初始化STORE_PATH文件夹
if (process.type === 'main') {
  if (!fsExtra.pathExistsSync(STORE_PATH)) { // 如果不存在路径
    fsExtra.mkdirpSync(STORE_PATH) // 就创建
  }
}
// 生产环境下第一次使用本应用,应初始化db
if (!db.has('how_long_software_run').value()) {
  db.set('how_long_software_run', []).write()
}

async function add(tableName, data) {
  await db.read().get(tableName).push(data).write()
  return '数据保存路径: ' + STORE_PATH
}
export { add }

