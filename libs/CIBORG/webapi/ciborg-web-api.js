"use strict";
let debug = require('debug')('ciborg-web-api');
debug.enabled = true;

let webApi = function(Props, services, CiborgError, CiborgValidator) {

    // enables or disables debug according to configuration file
    if(!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }

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
    }

    // resolves response with data from service
    function resolveServiceResponse(data, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = data.statusCode;
        let payload = { payload : data.body };
        rsp.json(payload);
    }

    // get popular games
    async function getMostPopularGames(req, rsp) {
        try {
            // service call
            let data = await services.games.getMostPopularGames();
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getMostPopularGames')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.games.searchByName(req.params.name);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getGameByName')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            console.log(Object.keys(req));
            console.log(req.body);
            let validatorErr = CiborgValidator.validateCreateGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend('createGroup validator')(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            let data = await services.groups.createGroup(req.body);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('createGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let validatorErr = CiborgValidator.validateUpdateGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend('updateGroup validator')(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }            
            // service call
            let data = await services.groups.updateGroupWithNoGames(req.body);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('updateGroup')(error);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.groups.getAllGroups();
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getAllGroups')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.groups.getGroupById(req.params.id);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('getGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.groups.addGameToGroup(req.body.groupId, req.body.gameName);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('addGameToGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.groups.removeGameFromGroup(req.body.groupId, req.body.gameName);
            resolveServiceResponse(data,rsp);
        } catch(err) {
            debug.extend('removeGameFromGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
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
            let data = await services.groups.getGamesFromGroup(req.params.id);
            resolveServiceResponse(data,rsp);
        } catch (err) {
            debug.extend('getGamesFromGroup')(err);
            if(!(err instanceof CiborgError)) {
                err = new CiborgError(
                    'Error in service: getGamesByGroupID.',
                    'Unable to get games from group.',
                    '500' // Internal Server Error
                );
            }
        }
        err.resolveErrorResponse(rsp);
    }
}

module.exports = webApi;
