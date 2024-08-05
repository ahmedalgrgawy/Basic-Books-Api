var queries = require('../db/queries')
var dbConnection = require('../db/connection')
var generator = require('../utils/generator')
var auditService = require('../services/audit.service')
var Actions = require('../utils/auditActions')
var Logger = require('../services/logger.service')
var ApiError = require('../errors/apiError')
var errorStatus = require('../errors/statusErrors')
var errorType = require('../errors/errorTypes')

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