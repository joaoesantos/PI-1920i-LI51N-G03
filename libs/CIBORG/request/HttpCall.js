'use strict';

let request = require('request');

let httpCall = (CiborgError) => {

    let genericMethodCall = (method) => {
        return (options, handler) => {
            request[method.toLowerCase()](options, function(err, resp) {
                if (err) { 
                    let error = new CiborgError(
                        'Error accessiing external service.',
                        'Unable to add game to group.',
                        '500' // Internal Server Error
                    );
                    handler(error);
                } else {
                    handler(null, resp);
                }
            })
        };
    }

    let HttpCall = {
        get: genericMethodCall("GET"),
        post: genericMethodCall("POST"),
        put: genericMethodCall("PUT"),
        delete: genericMethodCall("DELETE")
    }
    return HttpCall;
}

module.exports = httpCall;