let request = require('request')
let cheerio = require('cheerio')
// let fs = require('fs')

let url = 'http://www.bluemooncamera.com/inventory.php?menuID=0&catID=100&deptID=141'

request(url, function (err, res, html) {
  if (err) console.log('Request Error:', err)
  else {
    console.log('we made req successfully')
    parseResponse(html)
  }
})

let results = []

function parseResponse (html) {
  let $ = cheerio.load(html)
  let productsTable = $('#sub_right table')
  let tableItems = productsTable.find('tr')
  tableItems.each(function () {
    let element = $(this)
    let descriptText = element.children().first().text()
    if (descriptText.includes('35')) {
      let foundItem = {
        description: descriptText,
        price: $(element.children()[1]).text()
      }
      results.push(foundItem)
    }
  })
  console.log(results)
}
