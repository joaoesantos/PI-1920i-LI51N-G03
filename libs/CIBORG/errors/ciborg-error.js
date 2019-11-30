class CiborgError extends Error {
    constructor(apiErrorMessage, clientErrorMessage, statusCode) {
        super(apiErrorMessage);
        this.clientErrorMessage = clientErrorMessage;
        this.statusCode = statusCode;

        //Creates a stack for this error
        Error.captureStackTrace(this, this.constructor);
    }
    resolveErrorResponse(rsp) {
        rsp.statusCode = this.statusCode;
        let errorResponsePayload = { payload : { clientErrorMessage : this.clientErrorMessage } };
        errorResponsePayload.payload.apiErrorMessage = this.message;
        rsp.end(JSON.stringify(errorResponsePayload));
    }

    toString() {
        return JSON.stringify({
            apiErrorMessage : this.message,
            clientErrorMessage : this.clientErrorMessage,
            statusCode : this.statusCode
        });
    }
}
module.exports =  CiborgError;