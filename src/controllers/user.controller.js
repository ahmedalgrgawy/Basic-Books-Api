var queries = require('../db/queries')
var dbConnection = require('../db/connection')
var generator = require('../utils/generator')
var auditService = require('../services/audit.service')
var Actions = require('../utils/auditActions')
var Logger = require('../services/logger.service')
var ApiError = require('../errors/apiError')
var errorStatus = require('../errors/statusErrors')
var errorType = require('../errors/errorTypes')
var validations = require('../utils/validation')
var bcrypt = require('bcryptjs');

const loggerService = new Logger('user.controller')

exports.getUsersList = async (req, res) => {

    try {

        var usersQuery = queries.queryList.GET_USERS_LIST_QUERY

        var data = await dbConnection.dbQuery(usersQuery);

        loggerService.info('Users List ', data.rows)

        auditService.prepareAudit(Actions.auditActions.GET_USERS_LIST, data.rows, null, 'Ahmed', generator.dateFormat());

        return res.status(200).send(JSON.stringify(data.rows))

    } catch (error) {
        loggerService.error('Failed to load users', JSON.stringify(error))
        let errorMessage = 'Failed to get users' + error;
        auditService.prepareAudit(Actions.auditActions.GET_USERS_LIST, null, JSON.stringify(errorMessage), "postman", auditOn);
        return res.status(500).send({ error: 'Failed to load book' })
    }

}

exports.saveUser = async (req, res) => {

    try {

        var userName = req.body.userName;
        var email = req.body.email;
        var password = req.body.password;
        var userTypeCode = req.body.userTypeCode;
        var fullName = req.body.fullName;
        var createdBy = "admin"
        var createdOn = new Date()

        if (!userName || !email || !password || !userTypeCode || !fullName) {
            return res.status(500).send({ error: "There is data missing" })
        }

        var checkUserQuery = queries.queryList.USER_EXISTS_QUERY

        var userExistence = await dbConnection.dbQuery(checkUserQuery, [userName, email]);

        if (userExistence.rows[0].count != "0") {
            return res.status(500).send({ error: "User Already Exists" })
        }

        if (!validations.isValidEmail(email)) {
            return res.status(500).send({ error: "Email is Not Valid" })
        }

        if (!validations.isValidPassword(password)) {
            return res.status(500).send({ error: "Password is Not Valid" })
        }

        var hashedPassword = await bcrypt.hash(password, 10);

        console.log('pass');

        var values = [userName, hashedPassword, email, userTypeCode, fullName, createdOn, createdBy]

        var usersQuery = queries.queryList.SAVE_USER_QUERY

        await dbConnection.dbQuery(usersQuery, values);

        return res.status(201).send({ message: "User Saved" })
    } catch (error) {
        console.log(error);
        loggerService.error("Failed to save user", JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to save user' })
    }
}