
let ciborgError =

class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, errorCode, statusCode){
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
    resolveErrorResponse(err, rsp) {
        rsp.statusCode = err.statusCode;
        rsp.statusMessage = err.statusMessage;
        rsp.write(err.clientErrorMessage);
        rsp.end();
    }
}

module.exports = ciborgError;