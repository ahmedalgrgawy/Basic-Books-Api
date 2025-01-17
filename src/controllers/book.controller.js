var queries = require('../db/queries')
var dbConnection = require('../db/connection')
var generator = require('../utils/generator')
var auditService = require('../services/audit.service')
var Actions = require('../utils/auditActions')
var Logger = require('../services/logger.service')
var ApiError = require('../errors/apiError')
var errorStatus = require('../errors/statusErrors')
var errorType = require('../errors/errorTypes')

const loggerService = new Logger('book.controller')

exports.getBookList = async (req, res) => {

    try {

        var bookQuery = queries.queryList.GET_BOOK_LIST_QUERY

        var data = await dbConnection.dbQuery(bookQuery);

        loggerService.info('Book List ', data.rows)

        auditService.prepareAudit(Actions.auditActions.GET_BOOK_LIST, data.rows, null, 'Ahmed', generator.dateFormat());

        return res.status(200).send(JSON.stringify(data.rows))

    } catch (error) {
        loggerService.error('Failed to load book', JSON.stringify(error))
        let errorMessage = 'Failed to get books' + error;
        auditService.prepareAudit(Actions.auditActions.GET_BOOK_LIST, null, JSON.stringify(errorMessage), "postman", auditOn);
        return res.status(500).send({ error: 'Failed to load book' })
    }

}

exports.getBookDetails = async (req, res) => {
    try {

        var bookId = req.params.id

        if (isNaN(bookId)) {
            throw new ApiError(errorType.API_ERROR, errorStatus.INTERNAL_SERVER_ERROR, "Invalid bookId , is not a number , bookId value is : " + bookId, true);
        }

        var bookQuery = queries.queryList.GET_BOOK_DETAILS_QUERY

        var data = await dbConnection.dbQuery(bookQuery, [bookId]);

        return res.status(200).send(JSON.stringify(data.rows[0]))

    } catch (error) {
        loggerService.error(error.msg, error.name)
        loggerService.error("Failed to load book details", JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to load book details' })
    }
}

exports.saveBook = async (req, res) => {

    try {

        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;
        var createdBy = "admin"
        var createdOn = new Date()

        if (!title || !author || !publisher || !storeCode) {
            return res.status(500).send({ error: "There is data missing" })
        }

        var values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn]

        var bookQuery = queries.queryList.SAVE_BOOK_QUERY

        await dbConnection.dbQuery(bookQuery, values);

        return res.status(201).send({ message: "Book Saved" })
    } catch (error) {
        loggerService.error("Failed to save book", JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to save book' })
    }
}

exports.updateBook = async (req, res) => {

    try {

        var bookId = req.body.bookId
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;
        var createdBy = "admin"
        var createdOn = new Date()

        if (!bookId, !title || !author || !publisher || !storeCode) {
            return res.status(500).send({ error: "There is data missing" })
        }

        var values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn, bookId]

        var bookQuery = queries.queryList.UPDATE_BOOK_QUERY

        await dbConnection.dbQuery(bookQuery, values);

        return res.status(201).send({ message: "Book Updated" })
    } catch (error) {
        loggerService.error("Failed to update book", JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to update book' })
    }
}

exports.deleteBook = async (req, res) => {

    var bookId = req.params.id

    try {

        if (isNaN(bookId)) {
            throw new ApiError(errorType.API_ERROR, errorStatus.INTERNAL_SERVER_ERROR, "Invalid bookId , is not a number , bookId value is : " + bookId, true);
        }

        if (!bookId) {
            return res.status(500).send({ error: "Can Not Delete Empty Book" })
        }

        var deleteQuery = queries.queryList.DELETE_BOOK_QUERY

        await dbConnection.dbQuery(deleteQuery, [bookId]);

        return res.status(200).send({ message: "Book Deleted" })


    } catch (error) {
        loggerService.error("Failed to delete book", JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to delete book' })
    }

}