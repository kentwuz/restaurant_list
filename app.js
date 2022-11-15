//資料庫設定
const mongoose = require('mongoose') //載入Mongoose
//非正式環境下使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error')
})
db.once('open', () => {
  console.log('MongoDB connect!')
})
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//設定連線到MongoDB
//express設定
const express = require('express')
const app = express()

//設定template engine
const { engine } = require('express-handlebars')
app.engine('hbs', engine({ defaultLayout: "main", extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})