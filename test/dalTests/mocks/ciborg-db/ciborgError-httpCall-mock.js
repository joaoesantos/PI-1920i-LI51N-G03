'use strict';

let httpCall = (CiborgError) => {
    let genericMethodCall = (method) => {
        return async(options) => {
            throw new CiborgError(null,
                'CiborgErrorTest',
                'CiborgErrorTest',
                '500' // Internal Server Error
            )
        };
    };
    let HttpCall = {
        get: genericMethodCall("GET"),
        post: genericMethodCall("POST"),
        put: genericMethodCall("PUT"),
        delete: genericMethodCall("DELETE")
    }
    return HttpCall;
}

module.exports = httpCall;