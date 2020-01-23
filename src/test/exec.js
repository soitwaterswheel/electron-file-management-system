let catchWebsite = require('./novelQuery2').catchWebsite
let getLinks = require('./novelQuery3').getLinks
let l = console.log

const opts = {
  path: 'http://www.jipinwx.com/quanyudao/13359547.html',
  process: [
    [1, '#nr1', 0],
    [2, '.m_nr_css_page .m_nr_css_page_next', 1]
  ],
}
let r

async function en() {
  r = await catchWebsite(opts)
  console.log('in call --> ', r)
}
en()


async function fn() {
  r = await getLinks()
}

// fn()