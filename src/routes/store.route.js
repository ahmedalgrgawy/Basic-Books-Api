var express = require('express')
const router = express.Router()
var storeController = require('../controllers/store.controller')

router.get('/store', storeController.getStoreList)
router.post('/store/save', storeController.saveStoreList)

module.exports = router