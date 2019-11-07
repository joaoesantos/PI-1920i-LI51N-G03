"use strict";

module.exports = function(services) {

    const CiborgError = require('./../errors/ciborg-error.js');
    const CiborgValidator = require('./validator.js')
    //const services = require('./../services/ciborg-services.js')

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
        rsp.header("Content-type:application/json");
        rsp.statusCode = data.statusCode;
        rsp.end(JSON.stringify(data.body));
    }
    // callback
    function serviceCallback(err, data) {
        if(err) {
            CiborgError.resolveErrorResponse(err, rsp);
        } else {
            resolveServiceResponse(data, rsp);
        } 
    }

    // get popular games
    function getAllGames(err, req, rsp) {
        try {
            // service call
            services.games.getAllGames(serviceCallback)
        } catch(error) {
            err = new CiborgError(
                'Error in service: getAllGames.',
                'Unable to get popular games.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // search game by name
    function getGame(err, req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.name);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.games.getGame(req.body.name, serviceCallback)
        } catch(error) {
            err = new CiborgError(
                'Error in service: getGame.',
                'Unable to for game.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // create group
    function createGroup(err, req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.description);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.createGroup(req.body.description, serviceCallback)
        } catch(error) {
            err = new CiborgError(
                'Error in service: createGroup.',
                'Unable to create group.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // edit group
    function updateGroup(err, req, rsp) {
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
            err = new CiborgError(
                'Error in service: updateGroup.',
                'Unable to update group.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // list all groups
    function getAllGroups(err, req, rsp) {
        try {
            // service call
            services.groups.getAllGroups(serviceCallback);
        } catch(error) {
            err = new CiborgError(
                'Error in service: getAllGroups.',
                'Unable to get popular groups.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // get group details
    function getGroup(err, req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.body.id);
            if(validatorErr) {
                CiborgError.resolveErrorResponse(validatorErr, rsp);
            }
            // service call
            services.groups.getGroupById(req.body.id, serviceCallback);
        } catch(error) {
            err = new CiborgError(
                'Error in service: getGroupById.',
                'Unable to get group details.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // add game to group
    function addGameToGroup(err, req, rsp) {
        try {
            // service call
            services.groups.addGameToGroup(req.body.id, req.body.name, serviceCallback);
        } catch(error) {
            err = new CiborgError(
                'Error in service: addGameToGroup.',
                'Unable to add game to group.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // remove game from group
    function removeGameFromGroup(err, req, rsp) {
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
            err = new CiborgError(
                'Error in service: removeGameFromGroup.',
                'Unable to remove game from group.',
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

    // get all games froum a group
    function getGamesFromGroup(req, rsp) {
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
                '503' //Service Unavailable
            );
            CiborgError.resolveErrorResponse(err, rsp);
        }
    }

}
