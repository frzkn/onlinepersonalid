// .get('https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(imageUrl))

require('dotenv').config()
const express = require('express')
const app = express()
const scrapedin = require('scrapedin')
const cors = require('cors')
const multipart = require('connect-multiparty')
const multiMiddleware = multipart()
const imgur = require('imgur')
const puppeteer = require('puppeteer')
const request = require('request')
const cheerio = require('cheerio')
const blacklist = require('./blacklist.js')
const fs = require('fs')


app.use(cors())
// app.options('*', cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb', extended: false }))


app.get('/linkedin', async (req, res) => {
  console.log('Get prof req')
  const profileScraper = await scrapedin({
    email: process.env.EMAIL_ACC,
    password: process.env.EMAIL_PASS
  })
  const profile = await profileScraper(
    `https://www.linkedin.com/in/${req.query.uname}`
  )
  res.json(profile['profile'])
})

app.post('/google', multiMiddleware, (req, res) => {
  console.log('Get google req')
  var newArr
  imgur.setClientId(process.env.IMGUR_CLIENT)
  imgur
    .uploadFile(req.files.image.path)
    .then(function(json) {
      let linkStr = `https://www.google.com/searchbyimage?&image_url=${json.data.link}`
      request(
        {
          method: 'GET',
          url: linkStr
        },
        async (err, resp, body) => {
          if (err) return console.error(err)
          let $ = cheerio.load(body)
          console.log(linkStr)
          const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
          })
          const page = await browser.newPage()
          await page.setViewport({ width: 1200, height: 1200 })
          await page.goto(linkStr)
          const SELECTOR = '.iUh30'
          let arrLinks = await page.evaluate((sel) => {
            let a = document.querySelectorAll(sel)
            let arr = []
            for (let i = 0; i < a.length; i++) {
              arr.push(a[i].innerHTML)
            }
            return arr
          }, SELECTOR)
          let newArr = arrLinks.map((link) => {
            return link.split(' ›')[0]
          })
          newArr = [...new Set(newArr)]
          let newObj = []
          for (let x = 0; x < newArr.length; x++) {
            let status = blacklist.includes(newArr[x]) ? 'BAD' : 'GOOD'
            newObj.push({ name: newArr[x], status: status })
          }
          newObj = { data: [...newObj] }
          console.log(newObj)
          return res.send(newObj)
        }
      )
    })
    .catch(function(err) {
      console.error(err.message)
    })
  // res.end()
})

app.listen('3001', () => {
  console.log('server is running')
})
