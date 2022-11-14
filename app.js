//資料庫設定
const mongoose = require('mongoose') //載入Mongoose
const db = mongoose.connection
db.on('error',()=> {
  console.log('MongoDB error')
})
db.once('open',()=> {
  console.log('MongoDB connect!')
})
//express設定
const express = require('express')
const app = express()
//非正式環境下使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//設定連線到Mongoose DB