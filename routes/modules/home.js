//引用Express
const express = require('express')
const router = express.Router()

//引用restaurant model
const RestaurantModel = require('../../models/restaurant')

//定義首頁路由
router.get('/', (req, res) => {
  RestaurantModel.find() //取出資料庫中資料
    .lean()
    .then(restaurants => res.render('index', { restaurants })) //將相關資料傳給index樣板
    .catch(error => console.log(error))
})

module.exports=router