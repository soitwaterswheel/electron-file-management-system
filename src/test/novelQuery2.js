const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const fs = require('fs')

// 网页内容
let data = null
// 汇总截取的文本
let text = ''
// 单次操作步骤
let processes = []

let l = console.log

async function catchWebsite(opts) {
  // 请求网页,并将网页内容写入全局变量data
  await requestNewPage(opts.path)
  processes = opts.process
  execProcesses()
}

async function execProcesses() {
  for (let p of processes) {
    console.log('operata -->> ', p)
    if (p[2] === 0) {
      // 需要截取DOM文本
      text += clipDomText(p[1])
      console.log('current text:\n', text)
    } else if (p[2] === 1) {
      // 需要获取链接后进行链接跳转
      // 该方法未完成
      l('start to request new Page, ')
      await requestNewPage(clipLink(p[1]))
    }
  }
}

/**
 * @description 截取目标DOM元素内容
 * @param {string} path 
 * @param {string} selector
 */
function clipDomText(selector) {
  let $ = cheerio.load(data)
  return $(selector).text().trim() + '\r\n'
}

function clipLink(selector) {
  let $ = cheerio.load(data)
  l('点击链接：\n', selector, $(selector).text(), $(selector)[1].attr('href'))
  return $(selector).attr('href')
}


async function requestNewPage(path) {
  await axios({
    method: 'get',
    url: path,
    responseType: 'arraybuffer'
  }).then(res => {
    // fs.writeFileSync(`./${+new Date()}.txt`, res.data)
    data = iconv.decode(new Buffer(res.data), 'GBK')
  })
}


module.exports.catchWebsite = catchWebsite 