
module.exports = function() {

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

    function getAllGames(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'getAllGames' }));
    }

    function getGame(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'getGame' }));
    }

    function createGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload :'createGroup' }));
    }

    function updateGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'updateGroup'}));
    }

    function getAllGroups(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'getAllGroups'}));
    }

    function getGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'getGroup'}));
    }

    function addGameToGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'addGameToGroup'}));
    }

    function removeGameFromGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'removeGameFromGroup'}));
    }

    function getGamesFromGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end(JSON.stringify({ payload : 'getGamesFromGroup'}));
    }

}