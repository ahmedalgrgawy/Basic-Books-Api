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
const Jwt = require('../utils/token')

const loggerService = new Logger('user.controller')

exports.getUserProfileData = async (req, res) => {

    var user = req.user;

    try {
        return res.status(200).send(JSON.stringify(user))

    } catch (error) {
        return res.status(500).send({ error: error })
    }

}

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(errorStatus.INTERNAL_SERVER_ERROR).send({ error: "There is data missing" })
        }

        var loginQuery = queries.queryList.LOGIN_QUERY

        var data = await dbConnection.dbQuery(loginQuery, [username]);

        var userData = data.rows[0]

        if (!userData == null) {
            loggerService.info("user" + username + "does not exist");
            return res.status(errorStatus.unauthorized).send({ error: "Invalid User , try again" })
        }

        if (!validations.comparePassword(password, userData.password)) {
            loggerService.info("user" + username + "tried to login with wrong password");
            return res.status(errorStatus.unauthorized).send({ error: "Wrong Password , try again" })
        }

        var userRoles = await this.getUserRole(userData.user_id)

        var token = Jwt.generateToken(userData.user_id, userData.username, userData.email, userData.FULL_NAME, userRoles, userData.USER_TYPE_CODE)

        return res.status(200).send(JSON.stringify(token))

    } catch (error) {
        loggerService.error('Failed to log in', JSON.stringify(error))
        return res.status(500).send({ error: 'Failed to log in' })
    }
}

exports.getUserRole = async (userId) => {
    try {

        let roles = ["user", "admin"]

        return roles;

    } catch (error) {
        return error;
    }
}