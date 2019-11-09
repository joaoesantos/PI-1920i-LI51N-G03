class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, statusCode){
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.statusCode = statusCode;
    }
    resolveErrorResponse(rsp) {
        rsp.statusCode = this.statusCode;
        rsp.end(JSON.stringify({ payload : this.clientErrorMessage }));
    }
}
module.exports =  CiborgError;