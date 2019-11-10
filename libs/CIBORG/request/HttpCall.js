'use strict';

let request = require('request');
var debug = require('debug')('board-games-data');
    
let httpCall = (Props, CiborgError) => {
    if(!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }
    let genericMethodCall = (method) => {
        return (options, handler) => {
            request[method.toLowerCase()](options, function(err, resp) {
                if (err) { 
                    debug.extend('genericMethodCall')(err);
                    let error = new CiborgError(
                        'Error accessing external service.',
                        'Unable to add game to group.',
                        '500' // Internal Server Error
                    );
                    handler(error);
                } else {
                    debug.extend('genericMethodCall')("RECEIVED HTTP RESPONSE");
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