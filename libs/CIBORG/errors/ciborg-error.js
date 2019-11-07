let CiborgError =

class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, statusCode){
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.statusCode = statusCode;
    }
    resolveErrorResponse(err, rsp) {
        rsp.statusCode = err.statusCode;
        rsp.statusMessage = err.statusMessage;
        rsp.write(err.clientErrorMessage);
        rsp.end();
    }
}

module.exports = CiborgError;