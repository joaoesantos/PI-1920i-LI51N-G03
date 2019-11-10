"use strict";

let webApi = function(services, CiborgError, CiborgValidator) {
    return {
        getAllGames : getAllGames,
        getGame : getGame,
        createGroup : createGroup,
        updateGroup : updateGroup,
        getAllGroups : getAllGroups,
        getGroup : getGroup,
        addGameToGroup : addGameToGroup,
        removeGameFromGroup : removeGameFromGroup,
        getGamesFromGroup : getGamesFromGroup
    }

    // constructs response with data from service
    function resolveServiceResponse(data, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = data.statusCode;
        rsp.end(JSON.stringify(data.body));
    }
    // callback
    function serviceCallback(err, data) {
        if(err) {
            err.resolveErrorResponse(rsp);
        } else {
            resolveServiceResponse(data, rsp);
        } 
    }

    // get popular games
    function getAllGames(req, rsp) {
        try {
            // service call
            services.games.getAllGames(serviceCallback)
        } catch(error) {
            err = new CiborgError(
                'Error in service: getAllGames.',
                'Unable to get popular games.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // search game by name
    function getGame(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.name);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.games.getGame(req.body.name, serviceCallback)
        } catch(error) {
            let err = new CiborgError(
                'Error in service: getGame.',
                'Unable to for game.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // create group
    function createGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.description);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.createGroup(req.body.description, serviceCallback)
        } catch(error) {
            let err = new CiborgError(
                'Error in service: createGroup.',
                'Unable to create group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // edit group
    function updateGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.id);
            if(validatorErr)  {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            validatorErr = CiborgValidator.validateAlfanumeric(req.body.description);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.updateGroup(req.body.id, req.body.description, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: updateGroup.',
                'Unable to update group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // list all groups
    function getAllGroups(req, rsp) {
        try {
            // service call
            services.groups.getAllGroups(serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: getAllGroups.',
                'Unable to get popular groups.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // get group details
    function getGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.id);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.getGroupById(req.body.id, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: getGroupById.',
                'Unable to get group details.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // add game to group
    function addGameToGroup(req, rsp) {
        try {
            // service call
            services.groups.addGameToGroup(req.body.id, req.body.name, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: addGameToGroup.',
                'Unable to add game to group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // remove game from group
    function removeGameFromGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.id);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            validatorErr = CiborgValidator.validateAlfanumeric(req.body.description);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.removeGameFromGroup(req.body.id, req.body.name, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: removeGameFromGroup.',
                'Unable to remove game from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }

    // get all games froum a group
    function getGamesFromGroup(rsp, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.id);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.getGamesByGroupID(req.body.id, serviceCallback);
        } catch (error) {
            let err = new CiborgError(
                'Error in service: getGamesByGroupID.',
                'Unable to get games from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
    }
}

module.exports = webApi;
