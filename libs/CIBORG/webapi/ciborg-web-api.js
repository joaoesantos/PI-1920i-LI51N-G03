"use strict";

const ciborgError = require('./../errors/ciborg-error.js');
const services = require('./../services/ciborg-services.js')

// get popular games
function getAllGames(err, req, rsp) {
    try {
        services.getAllGames(processGetAllGames)
    } catch(error) {
        err = new ciborgError(
            'Error in service: getAllGames.',
            'Unable to get popular games.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processGetAllGames(err, games) {
        if(err) {
            rsp.statusCode = err.statusCode;
            rsp.statusMessage = err.statusMessage;
            rsp.write(err.clientErrorMessage);
            rsp.end();
        } else {
            rsp['body'] = games;
        }
    }
}

// search game by name
function getGame(err, req, rsp) {
    try {
        services.getGame(req.body.name, processGetGame)
    } catch(error) {
        err = new ciborgError(
            'Error in service: getGame.',
            'Unable to for game.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processGetGame(err, game) {
        if(err) {
           return;
        } else {
            rsp['body'] = game;
        }  
    }
}

// create group
function createGroup(err, req, rsp) {
    try {
        services.createGroup(req.body.description, processCreateGroup)
    } catch(error) {
        err = new ciborgError(
            'Error in service: createGroup.',
            'Unable to create group.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processCreateGroup(err, message) {
        if(err) {
            return;
         } else {
            rsp['body'] = message;
        }  
    }
}

// edit group
function updateGroup(err, req, rsp) {
    try {
        services.updateGroup(req.body.id, req.body.description, processUpdateGroup);
    } catch(error) {
        err = new ciborgError(
            'Error in service: updateGroup.',
            'Unable to update group.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processUpdateGroup(err, message) {
        if(err) {
            return;
         } else {
            rsp['body'] = message;
         }  
    }
}

// list all groups
function getAllGroups(err, req, rsp) {
    try {
        services.getAllGroups(processGetAllGroups);
    } catch(error) {
        err = new ciborgError(
            'Error in service: getAllGroups.',
            'Unable to get popular groups.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processGetAllGroups(err, groups) {
        if(err) {
            return;
         } else {
            rsp['body'] = groups;
         }  
    }
}

// get group details
function getGroup(err, req, rsp) {
    try {
        services.getGroupById(req.body.id, processGetGroupById);
    } catch(error) {
        err = new ciborgError(
            'Error in service: getGroupById.',
            'Unable to get group details.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processGetGroupById(err, group) {
        if(err) {
            return;
         } else {
            rsp['body'] = group;
         } 
    }
}

// add game to group
function addGameToGroup(err, req, rsp) {
    try {
        services.addGameToGroup(req.body.id, req.body.name, processAddGameToGroup);
    } catch(error) {
        err = new ciborgError(
            'Error in service: addGameToGroup.',
            'Unable to add game to group.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processAddGameToGroup(err, message) {
        if(err) {
            return;
         } else {
            rsp['body'] = message;
         } 
    }
}

// remove game from group
function removeGameFromGroup(err, req, rsp) {
    try {
        services.removeGameFromGroup(req.body.id, req.body.name, processRemoveGameFromGroup);
    } catch(error) {
        err = new ciborgError(
            'Error in service: removeGameFromGroup.',
            'Unable to remove game from group.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processRemoveGameFromGroup(err, message) {
        if(err) {
            return;
         } else {
            rsp['body'] = message;
         } 
    }
}

// get all games froum a group
function getGamesFromGroup(err, req, rsp) {
    try {
        services.getGamesByGroupID(req.body.id, processGetGamesByGroupID);
    } catch (error) {
        err = new ciborgError(
            'Error in service: getGamesByGroupID.',
            'Unable to get games from group.',
            '0000',
            'XXX'
        );
        return err;
    }
    // callback
    function processGetGamesByGroupID(err, games) {
        if(err) {
            return;
         } else {
            rsp['body'] = games;
         } 
    }
}

module.exports = {
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
