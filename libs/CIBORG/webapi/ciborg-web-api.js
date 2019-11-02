"use strict";

const services = require('./../services/ciborg-services.js')

// process requests

try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }

//
function getAllGames(req, rsp) {
    try {
        services.getAllGames(processGetAllGames)
    } catch(err) {
        err.clientErrorMessage = 'lols'
    }

    function processGetAllGames(err, games) {
        rsp.setHeader('Content-type', 'application/json')
        // rsp.end(JSON.stringify(games))
        rsp.json(games)
    }
}

// 
function getGame(req, rsp) {
    services.getGame(req.body.name, processGetGame)

    function processGetGame(err, game) {
      rsp.json(game)
    }
}

////
function createGroup(req, rsp) {
  services.createGroup(req.body.description, processCreateGroup)
  
  function processCreateGroup(err, status) {

  }
}

//
function updateGroup(req, rsp) {
    services.updateGroup(req.body.id, req.body.description, processUpdateGroup)
    
    function processUpdateGroup(err, status) {
  
    }
}

//
function getAllGroups(req, rsp) {
    services.getAllGroups(processGetAllGroups)

    function processGetAllGroups(err, groups) {
        rsp.json(groups)
    }
}

//
function getGroup(req, rsp) {
    services.getGroupById(req.body.id, processGetGroupById)

    function processGetGroupById(err, group) {
        rsp.json(group)
    }
}

//
function addGameToGroup(req, rsp) {
    services.addGameToGroup(req.body.id, req.body.name, processAddGameToGroup)

    function processAddGameToGroup(err, status) {

    }
}

//
function removeGameFromGroup(req, rsp) {
    services.removeGameFromGroup(req.body.id, req.body.name, processRemoveGameFromGroup)

    function processRemoveGameFromGroup(err, status) {

    }
}

//
function getGamesFromGroup(req, rsp) {
    services.getGamesByGroupID(req.body.id, processGetGamesByGroupID)

    function processGetGamesByGroupID(err, games) {
        rsp.json(games)
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
