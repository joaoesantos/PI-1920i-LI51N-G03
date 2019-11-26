let router = function(router, services) {
    router.get('/games', services.getMostPopularGames);
    router.get('/games/:name', services.getGameByName);
    router.post('/groups', services.createGroup);
    router.put('/groups', services.updateGroup);
    router.get('/groups', services.getAllGroups);
    router.get('/groups/:id', services.getGroup);
    router.put('/groups/games', services.addGameToGroup);
    router.delete('/groups/games', services.removeGameFromGroup);
    router.get('/groups/:id/games', services.getGamesFromGroup);
    console.log("ROUTER");
    console.log(services.getGamesFromGroup);

    return router;
}

module.exports = router;