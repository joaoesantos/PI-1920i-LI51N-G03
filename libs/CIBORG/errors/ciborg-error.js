class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, statusCode){
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.statusCode = statusCode;
    }
    resolveErrorResponse(rsp) {
        rsp.statusCode = this.statusCode;
        let errorResponsePayload = { payload : { clientErrorMessage : this.clientErrorMessage } };
        errorResponsePayload.payload.apiErrorMessage = this.message;
        rsp.end(JSON.stringify(errorResponsePayload));
    }
}
module.exports =  CiborgError;