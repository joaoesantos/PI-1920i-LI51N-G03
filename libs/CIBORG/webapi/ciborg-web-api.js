"use strict";

let webApi = function(services, CiborgError, CiborgValidator) {

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
            let err = new CiborgError(
                'Error in service: getAllGames.',
                'Unable to get popular games.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
            services.games.searchByName(req.urlParameters.name, serviceCallback)
        } catch(error) {
            let err = new CiborgError(
                'Error in service: getGame.',
                'Unable to get game.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }

    // create group
    function createGroup(req, rsp) {
        try {
            // ciborg validator
            let validatorErr = CiborgValidator.validateCreateGroupFormat(req.body);
            if(validatorErr)  {
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.createGroup(req.body, serviceCallback)
        } catch(error) {
            let err = new CiborgError(
                'Error in service: createGroup.',
                'Unable to create group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.updateGroupWithNoGames(req.body, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: updateGroup.',
                'Unable to update group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
            let err = new CiborgError(
                'Error in service: getAllGroups.',
                'Unable to get popular groups.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
            services.groups.getGroupById(req.urlParameters.id, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: getGroupById.',
                'Unable to get group details.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.addGameToGroup(req.body.groupId, req.body.gameName, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: addGameToGroup.',
                'Unable to add game to group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
               validatorErr.resolveErrorResponse(rsp);
           }
            // service call
            services.groups.removeGameFromGroup(req.body.groupId, req.body.gameName, serviceCallback);
        } catch(error) {
            let err = new CiborgError(
                'Error in service: removeGameFromGroup.',
                'Unable to remove game from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
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
            let validatorErr = CiborgValidator.validateAlfanumeric(req.urlParameters.id);
            if(validatorErr) {
                validatorErr.resolveErrorResponse(rsp);
            }
            // service call
            services.groups.getGamesFromGroup(req.urlParameters.id, serviceCallback);
        } catch (error) {
            let err = new CiborgError(
                'Error in service: getGamesByGroupID.',
                'Unable to get games from group.',
                '500' // Internal Server Error
            );
            err.resolveErrorResponse(rsp);
        }
        function serviceCallback(err, data) {
            if(err) {
                err.resolveErrorResponse(rsp);
            } else {
                resolveServiceResponse(data, rsp);
            } 
        }
    }
}

module.exports = webApi;
