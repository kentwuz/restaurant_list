//引用Express
const express = require('express')
const router = express.Router()

//引用restaurant model
const RestaurantModel = require('../../models/restaurant')
//設定相關路由
//新增餐廳功能
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const SaveRestaurant = new RestaurantModel(req.body)
  return SaveRestaurant.save((error, savedRestaurant) => {
    if (error) throw error
    res.redirect('/')
  })
})

//瀏覽指定頁面
router.get('/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log('error'))
})

//修改指定餐廳資料
router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log('error'))
})

router.put('/:_id', (req, res) => {
  const id = req.params._id
  const editInfo = req.body
  return RestaurantModel.findByIdAndUpdate(id, editInfo)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log('error'))
})

//刪除指定餐廳資料
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  return RestaurantModel.findByIdAndDelete(id)
    .then(() => res.redirect(`/`))
    .catch(error => console.log('error'))
})

module.exports = router