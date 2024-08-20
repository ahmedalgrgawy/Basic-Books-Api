var express = require('express')
const router = express.Router()
var loginController = require('../controllers/login.controller')
const Jwt = require('../utils/token')


router.get('/login/profile/:userId',  Jwt.verifyToken(['user']), loginController.getUserProfileData)
router.post('/login', loginController.login)

module.exports = router