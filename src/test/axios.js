var axios = require("axios")
var cheerio = require("cheerio")
axios
  .get("https://github.com/soitwater?tab=repositories").then(resp => {
    var df = cheerio.load(resp.data)
    console.log(df)
    var lis = df("#user-repositories-list li")
    var repos = []
    for (var i = 0; i < lis.length; i++) {
      var li = lis.eq(i)
      var repo = {
        repoName: li.find("h3").text().trim(),
        repoUrl: li.find("h3 a").attr("href").trim(),
        repoDesc: li.find("p").text().trim(),
        language: li.find("[itemprop=programmingLanguage]").text().trim(),
        star: li.find(".muted-link.mr-3").eq(0).text().trim(),
        fork: li.find(".muted-link.mr-3").eq(1).text().trim(),
        forkedFrom: li.find(".f6.text-gray.mb-1 a").text().trim()
      }
      repos.push(repo)
    }
    console.log(repos)
  })