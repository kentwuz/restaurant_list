//引用Express
const express = require('express')
const router = express.Router()
//引入模組程式碼
const home = require('./modules/home') //首頁
const restaurants = require('./modules/restaurants')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router