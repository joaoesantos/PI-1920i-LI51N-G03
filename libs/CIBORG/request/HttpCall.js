'use strict';

let request = require('request');
const debug = require('debug')('http-call');

let httpCall = (Props, CiborgError) => {

        let genericMethodCall = (method) => {
            return async(options) => {
                return new Promise(function(resolve, reject) {
                    request[method.toLowerCase()](options, function(err, resp) {
                        if (err) {
                            debug.extend('genericMethodCall')(err);
                            let error = new CiborgError(err,
                                'Error accessing external service.',
                                'Unable to add game to group.',
                                '500' // Internal Server Error
                            );
                            reject(error);
                        } else {
                            console.log(debug);
                            debug.extend('genericMethodCall')('RECEIVED HTTP RESPONSE');
                            resolve(resp);
                        }
                    })
                });
            }
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