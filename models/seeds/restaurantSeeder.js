const RestaurantModel = require('../restaurant') //載入restaurant Model
const db = require('../../config/mongoose')
const restaurantSeed = require('./restaurant.json')

db.once('open', () => {
  console.log('MongoDB connected!')
  RestaurantModel.create(restaurantSeed.results)
  console.log('done')
})