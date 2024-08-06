var express = require('express')
const router = express.Router()
var userController = require('../controllers/user.controller')

router.get('/users', userController.getUsersList)
router.post('/users/save-user', userController.saveUser)
router.put('/users/update-user/:id', userController.updateUser)
router.delete('/users/delete-user', userController.deleteUser)

module.exports = router