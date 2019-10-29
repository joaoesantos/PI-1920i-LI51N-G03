"use strict";

/*
REQUEST
destroy()	 
headers	Returns a key-value pair object containing header names and values
httpVersion	Returns the HTTP version sent by the client
method	Returns the request method
rawHeaders	Returns an array of the request headers
rawTrailers	Returns an array of the raw request trailer keys and values
setTimeout()	Calls a specified function after a specified number of milliseconds
statusCode	Returns the HTTP response status code
socket	Returns the Socket object for the connection
trailers	Returns an object containing the trailers
url	Returns the request URL string
*/

/*
RESPONSE
addTrailers()	Adds HTTP trailing headers
end()	Signals that the the server should consider that the response is complete
finished	Returns true if the response is complete, otherwise false
getHeader()	Returns the value of the specified header
headersSent	Returns true if headers were sent, otherwise false
removeHeader()	Removes the specified header
sendDate	Set to false if the Date header should not be sent in the response. Default true
setHeader()	Sets the specified header
setTimeout	Sets the timeout value of the socket to the specified number of milliseconds
statusCode	Sets the status code that will be sent to the client
statusMessage	Sets the status message that will be sent to the client
write()	Sends text, or a text stream, to the client
writeContinue()	Sends a HTTP Continue message to the client
writeHead()	Sends status and response headers to the client
 */

const services = require('./../services/ciborg-services.js')

// process requests
function getAllGames(req, rsp) {
    services.getAllGames(processGetAllGames)

    function processGetAllGames(err, games) {
        rsp.setHeader('Content-type', 'application/json')
        // rsp.end(JSON.stringify(games))
        rsp.json(games)
    }
}

// 
function getGame(req, rsp) {
    services.getGame(req.params.name, processGetGame)

    function processGetGame(err, game) {
      rsp.json(game)
    }
}

//
function createGroup(req, rsp) {
  services.createGroup(rsp.body.name, rsp.body.description, processCreateGroup)
  
  function processCreateGroup(err, status) {

  }
}

//
function updateGroup(req, rsp) {
    services.updateGroup(rsp.body.name, rsp.body.description, processUpdateGroup)
    
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
    services.getGroupById(processGetGroupById)

    function processGetGroupById(err, group) {
        rsp.json(group)
    }
}

//
function addGameToGroup(req, rsp) {
    services.addGameToGroup(processAddGameToGroup)

    function processAddGameToGroup(err, status) {

    }
}

//
function removeGameFromGroup(req, rsp) {
    services.removeGameFromGroup(processRemoveGameFromGroup)

    function processRemoveGameFromGroup(err, status) {

    }
}

//
function getGamesFromGroup(req, rsp) {
    services.getGamesByGroupID(processGetGamesByGroupID)

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
