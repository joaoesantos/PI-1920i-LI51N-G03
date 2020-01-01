'use strict';

const debug = require('debug')('ciborg-users');

let UserService = (Props, HttpCall, CiborgError) => {

    let UserServiceObject = {

        //internal service to get user from database
        getUserById: async(userId) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.userIndex + "/" + Props.elastProps.ops.search.url;
                let queryBody = Props.elastProps.ops.search.body;
                queryBody.query.term = { userId: { value: userId } };
                let opts = { url: fullUrl, json: true, body: queryBody };
                debug.extend('getUserById')('Handling HTTP GET.');
                let payload = await HttpCall.get(opts);
                if (payload.body.hits.total.value === 1) {
                    let user = payload.body.hits.hits[0]._source;
                    debug.extend('getUserById')('User ' + userId + ' retrieved with success.');
                    return {
                        statusCode: payload.statusCode,
                        body: user
                    };
                } else if (payload.body.hits.total.value === 0) {
                    throw new CiborgError(null,
                        'Error in service: user with id ' + userId + ' not found.',
                        'Unable to get user.',
                        '404' // Internal Server Error
                    );
                } else {
                    throw new CiborgError(null,
                        'Error in service: multiple users with id ' + userId + ' exist.',
                        'Unable to get user.',
                        '500' // Internal Server Error
                    );
                }
            } catch (err) {
                debug.extend('getUserById')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(err,
                        'Error in service: getUserById.',
                        'Unable to get user.',
                        '500' // Internal Server Error
                    );
                }
            }
        }
    };
    return UserServiceObject;
};

module.exports = UserService;