"use strict";
const debug = require('debug')('ciborg-web-api');

let webApi = function(Props, services, CiborgError, CiborgValidator) {

    return {
        getMostPopularGames : getMostPopularGames,
        getGameByName : getGameByName,
        createGroup : createGroup,
        updateGroup : updateGroup,
        getAllGroups : getAllGroups,
        getGroup : getGroup,
        addGameToGroup : addGameToGroup,
        removeGameFromGroup : removeGameFromGroup,
        getGamesFromGroup : getGamesFromGroup
    };

    // resolves response with data from service
    function resolveServiceResponse(data, rsp) {
        debug.extend('resolveServiceResponse')('End() response.');
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = data.statusCode;
        let payload = { payload : data.body };
        rsp.json(payload);
    }

    // get popular games
    async function getMostPopularGames(req, rsp) {
        try {
            // service call
            debug.extend('getMostPopularGames')('Handling game service getMostPopularGames.');
            let data = await services.games.getMostPopularGames();
            debug.extend('getMostPopularGames')('Service getMostPopularGames executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getMostPopularGames')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getAllGames.',
                    'Unable to get popular games.',
                    '500' // Internal Server Error
                );
            }
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
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getGameByName')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGame.',
                    'Unable to get game.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // create group
    async function createGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateGroupWithNoIdFormat(req.body);
            if(validatorErr)  {
                debug.extend('createGroup validator')(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            debug.extend('createGroup')('Handling group service createGroup.');
            let data = await services.groups.createGroup(req.body);
            debug.extend('createGroup')('Service createGroup executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('createGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: createGroup.',
                    'Unable to create group.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // edit group
    async function updateGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateGroupWithNoIdFormat(req.body);
            if(validatorErr) {
                debug.extend('updateGroup validator')(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            debug.extend('updateGroup')('Handling group service updateGroup.');
            let group = req.body; group.id = req.params.id;
            let data = await services.groups.updateGroup(group);
            debug.extend('updateGroup')('Service updateGroup executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('updateGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: updateGroup.',
                    'Unable to update group.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // list all groups
    async function getAllGroups(req, rsp) {
        try {
            // service call
            debug.extend('getAllGroups')('Handling group service getAllGroups.');
            let data = await services.groups.getAllGroups();
            debug.extend('getAllGroups')('Service getAllGroups executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getAllGroups')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getAllGroups.',
                    'Unable to get popular groups.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // get group details
    async function getGroup(req, rsp) {
        try {
            // service call
            debug.extend('getGroup')('Handling group service getGroupById.');
            let data = await services.groups.getGroupById(req.params.id);
            debug.extend('getGroup')('Service getGroupById executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGroupById.',
                    'Unable to get group details.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // add game to group
    async function addGameToGroup(req, rsp) {
        try {
            // service call
            debug.extend('addGameToGroup')('Handling group service addGameToGroup.');
            let data = await services.groups.addGameToGroup(req.params.groupId, req.params.gameId);
            debug.extend('addGameToGroup')('Service addGameToGroup executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('addGameToGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: addGameToGroup.',
                    'Unable to add game to group.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // remove game from group
    async function removeGameFromGroup(req, rsp) {
        try {
            // service call
            debug.extend('removeGameFromGroup')('Handling group service removeGameFromGroup.');
            let data = await services.groups.removeGameFromGroup(req.params.groupId, req.params.gameId);
            debug.extend('removeGameFromGroup')('Service removeGameFromGroup executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('removeGameFromGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: removeGameFromGroup.',
                    'Unable to remove game from group.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }

    // get all games froum a group
    async function getGamesFromGroup(req, rsp) {
        try {
            // service call
            debug.extend('getGamesFromGroup')('Handling group service getGamesFromGroup.');
            let data = await services.groups.getGamesFromGroup(req.params.id);
            debug.extend('getGamesFromGroup')('Service getGamesFromGroup executed with sucess.');
            resolveServiceResponse(data,rsp);
        } catch (err) {
            debug.extend('getGamesFromGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(err,
                    'Error in service: getGamesByGroupID.',
                    'Unable to get games from group.',
                    '500' // Internal Server Error
                );
            }
            err.resolveErrorResponse(rsp);
        }
    }
}

module.exports = webApi;
