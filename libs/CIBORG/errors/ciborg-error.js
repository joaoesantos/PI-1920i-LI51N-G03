
let ciborgError =

class CiborgError extends Error {
    constructor(apiErrorMessage, applicationErrorMessage, errorCode, statusCode){
        super(apiErrorMessage);
        this.applicationErrorMessage = applicationErrorMessage;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

module.exports = ciborgError;