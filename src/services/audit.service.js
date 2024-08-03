var event = require('events')
var auditModel = require('../models/audit.model');
var queries = require('../db/queries')
var dbConnection = require('../db/connection')
var Logger = require('../services/logger.service')

const loggerService = new Logger('audit.service')


var emitter = new event.EventEmitter()

emitter.on('audit', (audit) => {

    loggerService.info("Audit Event Emitter - Audit : ", JSON.stringify(audit))

    try {

        var auditQuery = queries.queryList.AUDIT_QUERY

        var values = [audit.auditAction, JSON.stringify(audit.data), audit.status, audit.error, audit.auditBy, audit.auditOn]

        dbConnection.dbQuery(auditQuery, values);

    } catch (error) {
        loggerService.error("Audit Event Emitter - error : ", error)
    }

})

exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {
    let status = 200;

    if (error) {
        status = 500;
    }

    var auditObj = new auditModel.Audit(auditAction, data, status, error, auditBy, auditOn)

    emitter.emit('audit', auditObj)
}