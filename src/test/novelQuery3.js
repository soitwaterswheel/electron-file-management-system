const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const fs = require('fs')

// 网页内容
let data = null

async function getLinks(opts) {
  await requestNewPage(opts.path)
  let $ = cheerio.load(data)
  let links = $(opts.selector)
  let arr = Array.from(links)
  let linksResult = []
  for (let i in links) {
    result[i] = arr[i].attribs.href
  }
  return JSON.stringify(linksResult)
}


async function requestNewPage(path) {
  await axios({
    method: 'get',
    url: path,
    responseType: 'arraybuffer'
  }).then(res => {
    data = iconv.decode(new Buffer(res.data), 'GBK')
  })
}


module.exports.getLinks = getLinks 