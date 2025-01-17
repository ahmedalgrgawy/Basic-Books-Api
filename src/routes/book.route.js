var express = require('express')
const router = express.Router()
var bookController = require('../controllers/book.controller')

router.get('/books', bookController.getBookList)
router.get('/book-details/:id', bookController.getBookDetails)
router.post('/book/save', bookController.saveBook)
router.put('/book/update', bookController.updateBook)
router.delete('/book/delete/:id', bookController.deleteBook)

module.exports = router