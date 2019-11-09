
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
        rsp.end('getAllGames');
    }

    function getGame(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('getGame');
    }

    function createGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('createGroup');
    }

    function updateGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('updateGroup');
    }

    function getAllGroups(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('getAllGroups');
    }

    function getGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('getGroup');
    }

    function addGameToGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('addGameToGroup');
    }

    function removeGameFromGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('removeGameFromGroup');
    }

    function getGamesFromGroup(req, rsp) {
        rsp.setHeader('Content-type', 'application/json')
        rsp.statusCode = '200';
        rsp.end('getGamesFromGroup');
    }

}