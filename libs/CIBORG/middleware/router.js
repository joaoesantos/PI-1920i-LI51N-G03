'use strict';

let router = function(router, services, authentication) {
    router.post('/login', authentication.notAllowAuthenticatedRequests, services.login);
    router.delete('/logout', authentication.allowAuthenticatedRequests, services.logout);
    router.get('/games/', authentication.allowAuthenticatedRequests, services.getMostPopularGames);
    router.get('/games/:name', authentication.allowAuthenticatedRequests, services.getGameByName);
    router.post('/groups', authentication.allowAuthenticatedRequests, services.createGroup);
    router.put('/groups/:id', authentication.allowAuthenticatedRequests, services.updateGroup);
    router.get('/groups', authentication.allowAuthenticatedRequests, services.getAllGroups);
    router.get('/groups/:id', authentication.allowAuthenticatedRequests, services.getGroup);
    router.put('/groups/:groupId/games/:gameId', authentication.allowAuthenticatedRequests, services.addGameToGroup);
    router.delete('/groups/:groupId/games/:gameId', authentication.allowAuthenticatedRequests, services.removeGameFromGroup);
    router.get('/groups/:id/games', authentication.allowAuthenticatedRequests, services.getGamesFromGroup);
    return router;
}

module.exports = router;