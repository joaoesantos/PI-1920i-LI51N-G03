
let ciborgError =

class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, errorCode, statusCode){
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

module.exports = ciborgError;