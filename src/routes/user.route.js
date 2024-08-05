var express = require('express')
const router = express.Router()
var userController = require('../controllers/user.controller')

router.get('/users', userController.getUsersList)
// router.post('/users/save', userController.saveUsersList)

module.exports = router