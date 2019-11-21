'use strict';

let httpCall = (CiborgError) => {
    let genericMethodCall = (method) => {
        return (options, handler) => {
            let err = new CiborgError(
                'CiborgErrorTest',
                'CiborgErrorTest',
                '500' // Internal Server Error
            )
            handler(err);
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