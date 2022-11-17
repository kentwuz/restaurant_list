//express設定
const express = require('express')
const app = express()
//設定template engine
const { engine } = require('express-handlebars')
app.engine('hbs', engine({ defaultLayout: "main", extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))//使用靜態檔案

//body-parser設定
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//引用路由器
const routes = require('./routes')
//將routes導入
app.use(routes)

require('./config/mongoose')

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})