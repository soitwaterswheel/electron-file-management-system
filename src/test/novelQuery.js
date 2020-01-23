const axios = window.axios




// const axios = require('axios')
// const cheerio = require('cheerio')
// const encoding = require('encoding')

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
  // execProcesses()
}

// async function execProcesses() {
//   for (let p of processes) {
//     console.log('operata>> ', p)
//     if (p[2] === 0) {
//       // 需要截取DOM文本
//       text += clipDomText(p[1])
//       console.log('current text:\n', text)
//     } else if (p[2] === 1) {
//       // 需要获取链接后进行链接跳转
//       // 该方法未完成
//       l('start to request new Page, ')
//       await requestNewPage(clipLink(p[1]))
//     }
//   }
// }

// /**
//  * @description 截取目标DOM元素内容
//  * @param {string} path 
//  * @param {string} selector
//  */
// function clipDomText(selector) {
//   // console.log(data)
//   let $ = cheerio.load(data)
//   // console.log('-->', $)
//   return $(selector).text().trim() + '\r\n'
// }

// function clipLink(selector) {
//   let $ = cheerio.load(data)
//   l(';;')
//   l(';; ', selector, $(selector).text())
//   return $(selector).attr('href')
// }


async function requestNewPage(path) {
  console.log('path ?? ', path)
  await axios({
    method: 'get',
    url: path,
    responseType: 'blob',
    transformResponse: [function (data) {
      let reader = new FileReader();
      reader.readAsText(data, 'GBK');
      reader.onload = function (e) {
        console.log('???');
        console.log(reader.result);
      }
      return data;
    }]
  }).then(res => {
    data = res.data
    l('*****\n\n')
    let d = res.data
    // l(encoding.convert(d, 'utf8', 'gbk').toString())
  })
}


export { catchWebsite }