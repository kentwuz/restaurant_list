const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //載入restaurant Model
const restaurantSeed = require('./restaurant.json')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
  Restaurant.create(restaurantSeed.results)
  console.log('done')
})