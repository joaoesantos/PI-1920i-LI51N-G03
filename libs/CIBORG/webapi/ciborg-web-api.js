"use strict";
const debug = require('debug')('ciborg-web-api');

let webApi = function(Props, services, CiborgError, CiborgValidator, passport) {

    return {
        login: login,
        logout: logout,
        getMostPopularGames: getMostPopularGames,
        getGameByName: getGameByName,
        createGroup: createGroup,
        updateGroup: updateGroup,
        getAllGroups: getAllGroups,
        getGroup: getGroup,
        addGameToGroup: addGameToGroup,
        removeGameFromGroup: removeGameFromGroup,
        getGamesFromGroup: getGamesFromGroup
    };

    // resolves response with data from service
    function resolveServiceResponse(data, rsp) {
        debug.extend('resolveServiceResponse')('End() response.');
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = data.statusCode;
        let payload = { payload: data.body };
        rsp.json(payload);
    }

    //login user
    async function login(req, rsp, next) {
        try {
            debug.extend('login')('Logging in.');
            passport.authenticate("local", function(err, user, info) {
                if (!user) {
                    err = new CiborgError(err,
                        'Error in service: login.',
                        'No user with that username was found.',
                        '404'
                    );
                }
                if (!user && !err) {
                    err = new CiborgError(err,
                        'Error in service: login.',
                        'Wrong username or credentials.',
                        '401' // Unauthorized
                    );
                }
                if (err) {

                    if (!(err instanceof CiborgError)) {
                        err = new CiborgError(err,
                            'Error in service: login.',
                            'Unable to login.',
                            '500' // Internal Server Error
                        );
                    }
                    debug.extend('login')(err);
                    err.resolveErrorResponse(rsp);
                } else {
                    req.logIn(user, function(err) {
                        try {
                            if (err) {
                                err = new CiborgError(err,
                                    'Error in service: login request.',
                                    'Unable to login.',
                                    '500' // Internal Server Error
                                );
                                debug.extend('login')(err);
                                err.resolveErrorResponse(rsp);
                            } else {
                                resolveServiceResponse({
                                    statusCode: 200,
                                    body: {
                                        message: "User logged in.",
                                        user: user
                                    }
                                }, rsp);
                            }
                        } catch (err) {
                            if (!(err instanceof CiborgError)) {
                                err = new CiborgError(err,
                                    'Error in service: login.',
                                    'Unable to login.',
                                    '500' // Internal Server Error
                                );
                            }
                            debug.extend('login')(err);
                            err.resolveErrorResponse(rsp);
                        }
                    });
                }
            })(req, rsp, next);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: login.',
                    'Unable to login.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('login')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    //logout user
    async function logout(req, rsp) {
        try {
            debug.extend('logout')('Logging out.');
            req.logOut();
            req.session.destroy(function(err) {
                if (err) {
                    if (!(err instanceof CiborgError)) {
                        err = new CiborgError(err,
                            'Error in service: logout.',
                            'Unable to logout.',
                            '500' // Internal Server Error
                        );
                    }
                    debug.extend('logout')(err);
                    err.resolveErrorResponse(rsp);
                } else {
                    resolveServiceResponse({
                        statusCode: 200,
                        body: {
                            message: "User logged out."
                        }
                    }, rsp);
                }
            });
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: logout.',
                    'Unable to logout.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('logout')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // get popular games
    async function getMostPopularGames(req, rsp) {
        try {
            // service call
            debug.extend('getMostPopularGames')('Handling game service getMostPopularGames.');
            let data = await services.games.getMostPopularGames();
            debug.extend('getMostPopularGames')('Service getMostPopularGames executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getAllGames.',
                    'Unable to get popular games.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('getMostPopularGames')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // search game by name
    async function getGameByName(req, rsp) {
        try {
            // service call
            debug.extend('getGameByName')('Handling game service searchByName.');
            let data = await services.games.searchByName(req.params.name);
            debug.extend('getGameByName')('Service searchByName executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGame.',
                    'Unable to get game.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('getGameByName')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // create group
    async function createGroup(req, rsp) {
        try {
            // ciborg validator
            CiborgValidator.validateGroupWithNoIdFormat(req.body);
            // service call
            debug.extend('createGroup')('Handling group service createGroup.');
            // add group owner information to request
            req.body.owner = req.session.passport.user;
            let data = await services.groups.createGroup(req.body);
            debug.extend('createGroup')('Service createGroup executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: createGroup.',
                    'Unable to create group.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('createGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // edit group
    async function updateGroup(req, rsp) {
        try {
            // ciborg validator
            CiborgValidator.validateGroupWithNoIdFormat(req.body);
            // service call
            debug.extend('updateGroup')('Handling group service updateGroup.');
            let userId = req.session.passport.user;
            let group = req.body;
            group.id = req.params.id;
            group.owner = userId;
            let data = await services.groups.updateGroup(userId, group);
            debug.extend('updateGroup')('Service updateGroup executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: updateGroup.',
                    'Unable to update group.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('updateGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // list all groups
    async function getAllGroups(req, rsp) {
        try {
            // service call
            debug.extend('getAllGroups')('Handling group service getAllGroups.');
            let userId = req.session.passport.user;
            let data = await services.groups.getAllGroups(userId);
            debug.extend('getAllGroups')('Service getAllGroups executed with sucess.');
            // filter groups by user session (owner)            
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getAllGroups.',
                    'Unable to get groups.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('getAllGroups')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // get group details
    async function getGroup(req, rsp) {
        try {
            // service call
            debug.extend('getGroup')('Handling group service getGroupById.');
            let userId = req.session.passport.user;
            let data = await services.groups.getGroupById(userId, req.params.id);
            debug.extend('getGroup')('Service getGroupById executed with sucess.');
            // ciborg validator            
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGroupById.',
                    'Unable to get group details.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('getGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // add game to group
    async function addGameToGroup(req, rsp) {
        try {
            // service call
            debug.extend('addGameToGroup')('Handling group service addGameToGroup.');
            let userId = req.session.passport.user;
            let data = await services.groups.addGameToGroup(userId, req.params.groupId, req.params.gameId);
            debug.extend('addGameToGroup')('Service addGameToGroup executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: addGameToGroup.',
                    'Unable to add game to group.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('addGameToGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // remove game from group
    async function removeGameFromGroup(req, rsp) {
        try {
            // service call
            debug.extend('removeGameFromGroup')('Handling group service removeGameFromGroup.');
            let userId = req.session.passport.user;
            let data = await services.groups.removeGameFromGroup(userId, req.params.groupId, req.params.gameId);
            debug.extend('removeGameFromGroup')('Service removeGameFromGroup executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: removeGameFromGroup.',
                    'Unable to remove game from group.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('removeGameFromGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }

    // get all games froum a group
    async function getGamesFromGroup(req, rsp) {
        try {
            // service call
            debug.extend('getGamesFromGroup')('Handling group service getGamesFromGroup.');
            let userId = req.session.passport.user;
            let data = await services.groups.getGamesFromGroup(userId, req.params.id);
            debug.extend('getGamesFromGroup')('Service getGamesFromGroup executed with sucess.');
            resolveServiceResponse(data, rsp);
        } catch (err) {
            if (!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGamesByGroupID.',
                    'Unable to get games from group.',
                    '500' // Internal Server Error
                );
            }
            debug.extend('getGamesFromGroup')(err);
            err.resolveErrorResponse(rsp);
        }
    }
}

module.exports = webApi;