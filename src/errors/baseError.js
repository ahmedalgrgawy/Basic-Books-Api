class BaseError extends Error {
    constructor(name, statusCode, msg, isOperational) {
        super(msg)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode;
        this.msg = msg;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError