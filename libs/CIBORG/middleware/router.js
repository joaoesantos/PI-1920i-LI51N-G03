'use strict';

let router = function(router, services, authentication) {
    router.post('/login', authentication.notAllowAuthenticatedRequests, services.login);
    router.delete('/logout', authentication.allowAuthenticatedRequests, services.logout);
    router.get('/games/', services.getMostPopularGames);
    router.get('/games/:name', services.getGameByName);
    router.post('/groups', services.createGroup);
    router.put('/groups/:id', services.updateGroup);
    router.get('/groups', services.getAllGroups);
    router.get('/groups/:id', services.getGroup);
    router.put('/groups/:groupId/games/:gameId', services.addGameToGroup);
    router.delete('/groups/:groupId/games/:gameId', services.removeGameFromGroup);
    router.get('/groups/:id/games', services.getGamesFromGroup);
    return router;
}

module.exports = router;