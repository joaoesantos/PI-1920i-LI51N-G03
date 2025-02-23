'use strict';

const debug = require('debug')('ciborg-users');

let UserService = (Props, HttpCall, CiborgError) => {

    let UserServiceObject = {

        // internal service to get user from database
        getUserById: async(userId) => {
            try {
                // Setting URL and headers for request
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.userIndex + "/" + Props.elastProps.ops.search.url;
                let queryBody = Props.elastProps.ops.search.body;
                queryBody.query.term = { userId: { value: userId.toLowerCase() } }; // lowerCase for elastic search
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
        },

        // internal service to check if user exists in database
        userExists: async(userId) => {
            try {
                // Setting URL and headers for request
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.userIndex + "/" + Props.elastProps.ops.search.url;
                let queryBody = Props.elastProps.ops.search.body;
                queryBody.query.term = { userId: { value: userId.toLowerCase() } }; // lowerCase for elastic search
                let opts = { url: fullUrl, json: true, body: queryBody };
                debug.extend('userExists')('Handling HTTP GET.');
                let payload = await HttpCall.get(opts);
                if(payload.body.hits.total.value === 0) {
                    debug.extend('userExists')('User ' + userId + ' does not exist.');
                    return {
                        statusCode: payload.statusCode,
                        body: false
                    };
                }
                else {
                    debug.extend('userExists')('User ' + userId + ' already exists.');
                    return {
                        statusCode: payload.statusCode,
                        body: true
                    };
                }
            } catch (err) {
                debug.extend('userExists')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(err,
                        'Error in service: userExists.',
                        'Unable to get user.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        // internal service to create user
        signIn: async function(user) {
            debug.extend('signIn')('Handling signIn of user: ' + user.userId);
            // avaliates if user already exists
            try {
                // users doesn't exist, so its possible to perfom signIn
                if(!(await this.userExists(user.userId.toLowerCase())).body) { // lowerCase for elastic search
                    // Setting URL and headers for request
                    let fullUrl = Props.elastProps.host + "/" + Props.elastProps.userIndex + "/" + Props.elastProps.userIndex;
                    let opts = { url: fullUrl, json: true, body: user };
                    debug.extend('signIn')('Handling HTTP POST.');
                    let payload = await HttpCall.post(opts);
                    debug.extend('signIn')('User ' + user.userId + ' created.');
                    return {
                        statusCode: payload.statusCode,
                        body: user
                    };
                } else {
                    throw new CiborgError(null,
                        'Error in service: signIn.',
                        'User already exists.',
                        '500' // Internal Server Error
                    );
                }
            } catch(err) {
                debug.extend('signIn')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(err,
                        'Error in service: signIn.',
                        'Unable to create new account.',
                        '500' // Internal Server Error
                    );
                }
            }
        }
    };
    return UserServiceObject;
};

module.exports = UserService;