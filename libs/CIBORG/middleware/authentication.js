'use strict';

const debug = require('debug')('authentication-middleware');

let AuthenticationMiddlewares = (Props, CiborgError) => {
    let MiddlewaresObject = {

        //authenticar os endpoints
        allowAuthenticatedRequests: function(req, rsp, next) {
            // if (req.isAuthenticated()) {
            //     return next();
            // } else {
            //     let err = new CiborgError(null,
            //         'Error accessing resource, Unauthorized.',
            //         'Unauthorized access.',
            //         '401' // Unauthorized
            //     );
            //     debug.extend('allowAuthenticatedRequests')(err);
            //     err.resolveErrorResponse(rsp);
            // }
        },

        //para o user na ir para o login quando ja esta logado
        notAllowAuthenticatedRequests: function(req, rsp, next) {
            // if (!req.isAuthenticated()) {
            //     next();
            // } else {
            //     let err = new CiborgError(null,
            //         'Error accessing resource, Forbidden.',
            //         'Cannot access when logged in.',
            //         '403' // Unauthorized
            //     );
            //     debug.extend('notAllowAuthenticatedRequests')(err);
            //     err.resolveErrorResponse(rsp);
            // }
        }
    };
    return MiddlewaresObject;
};

module.exports = AuthenticationMiddlewares;