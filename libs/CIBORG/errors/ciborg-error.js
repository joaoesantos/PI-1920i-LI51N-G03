/**
 * Custom error class extending javascript Error.
 */
class CiborgError extends Error {
    constructor(err, apiErrorMessage, clientErrorMessage, statusCode) {
        let errorMessage = err ? err.message : apiErrorMessage;
        super(errorMessage);
        this.apiErrorMessage = apiErrorMessage;
        this.clientErrorMessage = clientErrorMessage;
        this.statusCode = statusCode;

        //Creates a stack for this error
        if(err) {
            this.stack = err.stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    resolveErrorResponse(rsp) {
        console.log(this.statusCode);
        rsp.statusCode = this.statusCode;
        let errorResponsePayload = { payload : {
             clientErrorMessage : this.clientErrorMessage,
             apiErrorMessage : this.apiErrorMessage
        } };
        rsp.end(JSON.stringify(errorResponsePayload));
    }

    toString() {
        return JSON.stringify({
            apiErrorMessage : this.apiErrorMessage,
            clientErrorMessage : this.clientErrorMessage,
            statusCode : this.statusCode
        });
    }
}

module.exports =  CiborgError;