//資料庫設定
const mongoose = require('mongoose') //載入Mongoose
const RestaurantModel = require('./models/restaurant')//載入restaurant model
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
app.use(express.static('public'))//使用靜態檔案

//body-parser設定
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  RestaurantModel.find() //取出資料庫中資料
    .lean()
    .then(restaurants => res.render('index', { restaurants })) //將相關資料傳給index樣板
    .catch(error => console.log(error))
})
//新增餐廳功能
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const SaveRestaurant = new RestaurantModel(req.body)
  return SaveRestaurant.save((error, savedRestaurant) => {
    if (error) throw error
    res.redirect('/')
  })
})

//瀏覽指定頁面
app.get('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log('error'))
})

//修改指定餐廳資料
app.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log('error'))
})

app.put('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  const editInfo = req.body
  return RestaurantModel.findByIdAndUpdate(id, editInfo)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log('error'))
})

//刪除指定餐廳資料
app.delete('/restaurant/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findByIdAndDelete(id)
    .then(() => res.redirect(`/`))
    .catch(error => console.log('error'))
})

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})