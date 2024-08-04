const BaseError = require("./baseError")

class ApiError extends BaseError {
    constructor(name, statusCode, msg, isOperational) {
        super(name, statusCode, msg, isOperational)
    }
}

module.exports = ApiError