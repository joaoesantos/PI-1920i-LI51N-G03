"use strict";
let debug = require('debug')('ciborg-web-api');
debug.enabled = true;

let webApi = function(Props, services, CiborgError, CiborgValidator) {
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

    // constructs response with data from service
    function resolveServiceResponse(data, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = data.statusCode;
        let payload = { payload : data.body };
        rsp.end(JSON.stringify(payload));
    }

    // get popular games
    function getMostPopularGames(req, rsp) {
        try {
            // service call
            services.games.getMostPopularGames(serviceCallback);
        } catch(error) {
            debug.extend("getMostPopularGames")(error);
            let err = new CiborgError(
                'Error in service: getAllGames.',
                'Unable to get popular games.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("getMostPopularGames").extend("serviceCallback")("HANDLING getMostPopularGames");
            if(err) {
                debug.extend("getMostPopularGames").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // search game by name
    function getGameByName(req, rsp) {
        try {
            // service call
            services.games.searchByName(req.params.name, serviceCallback)
        } catch(error) {
            debug.extend("getGameByName")(error);
            let err = new CiborgError(
                'Error in service: getGame.',
                'Unable to get game.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("getGameByName").extend("serviceCallback")("HANDLING getGameByName");
            if(err) {
                debug.extend("getGameByName").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // create group
    function createGroup(req, rsp) {
        try {
            console.log('createGroup handler');
            console.log('CreateGroup req body',req.body);
            // ciborg validator
            let validatorErr = CiborgValidator.validateCreateGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend("createGroup")(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.createGroup(req.body, serviceCallback)
        } catch(error) {
            debug.extend("createGroup")(error);
            let err = new CiborgError(
                'Error in service: createGroup.',
                'Unable to create group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("createGroup").extend("serviceCallback")("HANDLING createGroup");
            if(err) {
                debug.extend("createGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // edit group
    function updateGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateUpdateGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend("updateGroup")(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }            
            // service call
            services.groups.updateGroupWithNoGames(req.body, serviceCallback);
        } catch(error) {
            debug.extend("updateGroup")(error);
            let err = new CiborgError(
                'Error in service: updateGroup.',
                'Unable to update group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("updateGroup").extend("serviceCallback")("HANDLING updateGroup");
            if(err) {
                debug.extend("updateGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // list all groups
    function getAllGroups(req, rsp) {
        try {
            // service call
            services.groups.getAllGroups(serviceCallback);
        } catch(error) {
            debug.extend("getAllGroups")(error);
            let err = new CiborgError(
                'Error in service: getAllGroups.',
                'Unable to get popular groups.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("getAllGroups").extend("serviceCallback")("HANDLING getAllGroups");
            if(err) {
                debug.extend("getAllGroups").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // get group details
    function getGroup(req, rsp) {
        try {
            // service call
            services.groups.getGroupById(req.params.id, serviceCallback);
        } catch(error) {
            debug.extend("getGroup")(error);
            let err = new CiborgError(
                'Error in service: getGroupById.',
                'Unable to get group details.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("getGroup").extend("serviceCallback")("HANDLING getGroup");
            if(err) {
                debug.extend("getGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // add game to group
    function addGameToGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAddGameToGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend("addGameToGroup")(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.addGameToGroup(req.body.groupId, req.body.gameName, serviceCallback);
        } catch(error) {
            debug.extend("addGameToGroup")(error);
            let err = new CiborgError(
                'Error in service: addGameToGroup.',
                'Unable to add game to group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("addGameToGroup").extend("serviceCallback")("HANDLING addGameToGroup");
            if(err) {
                debug.extend("addGameToGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // remove game from group
    function removeGameFromGroup(req, rsp) {
        try {
           // ciborg validator
           let validatorErr = CiborgValidator.validateRemoveGameFromGroupFormat(req.body);
            if(validatorErr)  {
                debug.extend("removeGameFromGroup")(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.removeGameFromGroup(req.body.groupId, req.body.gameName, serviceCallback);
        } catch(error) {
            debug.extend("removeGameFromGroup")(error);
            let err = new CiborgError(
                'Error in service: removeGameFromGroup.',
                'Unable to remove game from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("removeGameFromGroup").extend("serviceCallback")("HANDLING removeGameFromGroup");
            if(err) {
                debug.extend("removeGameFromGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // get all games froum a group
    function getGamesFromGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateAlfanumeric(req.params.id);
            if(validatorErr) {
                debug.extend("getGamesFromGroup")(validatorErr);
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.getGamesFromGroup(req.params.id, serviceCallback);
        } catch (error) {
            debug.extend("getGamesFromGroup")(error);
            let err = new CiborgError(
                'Error in service: getGamesByGroupID.',
                'Unable to get games from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            debug.extend("getGamesFromGroup").extend("serviceCallback")("HANDLING getGamesFromGroup");
            if(err) {
                debug.extend("getGamesFromGroup").extend("serviceCallback")(err);
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }
}

module.exports = webApi;
