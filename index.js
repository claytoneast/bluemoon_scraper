const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const url = 'http://www.bluemooncamera.com/inventory.php?menuID=0&catID=100&deptID=141'

request(url, function (err, res, html) {
  if (err) console.log('Request Error:', err)
  else {
    console.log('we made req successfully')
    parseResponse(html)
  }
})

let results = {
  items: []
}

function parseResponse (html) {
  let $ = cheerio.load(html)
  let productTableItems = $('#sub_right table tr')
  productTableItems.each(function () {
    let element = $(this)
    let descriptText = element.children().first().text()
    if (descriptText.includes('35')) {
      let foundItem = {
        description: descriptText,
        price: $(element.children()[1]).text()
      }
      results.items.push(foundItem)
    }
  })
  fs.writeFile('results.json', JSON.stringify(results, null, 4), function (err) {
    if (err) return console.log(err)
    console.log('wrote results successfully')
  })
}
