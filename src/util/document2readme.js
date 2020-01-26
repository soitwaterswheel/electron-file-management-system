let fs = window.fs

// 文件目录结构存储在全局变量result
// attr 是 文件名,即 result 的属性名
export function ScanDir(result, path, attr, ignore, prePath) {
  // 当前的path 是否为文件
  const isFile = fs.statSync(path).isFile()
  // 假如是文件
  if (isFile) {
    // 判断是否为应忽略的文件，若否:则
    !checkIgnore(attr, isFile, ignore) && result[getDocumentNameByFilename(path, attr)].push({
      name: attr.slice(0, attr.lastIndexOf('.')),
      path: path.replace(prePath, '.')
    });
    return
  }
  try {
    // 若为应忽略的文件夹，则
    if (attr !== '' && checkIgnore(attr, isFile, ignore)) {
      delete result[attr]
      return
    };
    fs.readdirSync(path).forEach(function (file) { // 遍历文件夹目录下的所有文件
      let documentPath = path + '/' + file
      let documentName = documentPath.slice(documentPath.lastIndexOf('/') + 1)
      // result 中还没有documentName 属性值 且 当前的路径不是文件时，才...
      if (!result[documentName] && !fs.statSync(documentPath).isFile()) {
        result[documentName] = [];
      }
      ScanDir(result, documentPath, documentName, ignore, prePath)
    })
  } catch (err) {
    console.log('err during scan the dir !!!\n', err)
  }

  // 获取当前文件所处的文件夹名字
  function getDocumentNameByFilename(path, name) {
    try {
      let pathWithoutFilename = path.slice(0, path.length - name.length - 1)
      return pathWithoutFilename.slice(pathWithoutFilename.lastIndexOf('/') + 1)
    } catch (err) { }
  }
  // 检查当前路径是否应忽略的文件夹 or 文件名
  function checkIgnore(file, isFile, ignore) {
    if (isFile) {
      return ignore.file.includes(file)
    } else {
      return ignore.document.includes(file)
    }
  }
}

// 将文件目录结果转换为文本
export function result2Text(result, title) {
  let data = title + '\n'
  for (let i in result) {
    let list = ''
    for (let arr of result[i]) {
      list += `- [${arr.name}](${arr.path})\n`
    }
    data += `
<details>
  <summary>${i}</summary>

${list}
</details>
    `
  }
  return data
}

// 创建并将文本写入Readme.md 文件
export function createReadme(data, prePath) {
  let path = prePath + '/README' + '.md'
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        console.log('err in create Readme.md!!\n' + err)
        reject(err)
      }
      resolve()
    })
  })

  function getTimeString() {
    let d = new Date()
    return "" + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds()
  }
}