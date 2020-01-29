import { add } from './lowdb.js'
import { promisify } from './commonUtils.js'
// import { app } from 'electron'

let path = window.path
const child_process_P = new Proxy(window.child_process, {
  get(target, key) {
    return promisify(target[key])
  }
})
let flag = undefined

// 当前运行的程序中是否包含目标程序
// 返回 true|false
async function whetherRunningTargetProcess(platform, targetProcess) {
  const cmd = platform ? 'tasklist' : 'ps aux'
  let stdout = await child_process_P.exec(cmd)
  stdout.split('\n').some(function (line) {
    let p = line.trim().split(/\s+/), pname = p[0], pid = p[1];
    if (pname.toLowerCase().indexOf(targetProcess) >= 0 && parseInt(pid)) {
      flag = true
      return true
    } else {
      flag = false
    }
  })
  return flag
}



async function addRecord(data) {
  let dbPath = await add('how_long_software_run', data)
  return dbPath
}


export { whetherRunningTargetProcess, addRecord }