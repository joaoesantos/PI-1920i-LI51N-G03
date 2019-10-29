"use strict";

const router = require('./router.js');
//const webapi = require('./ciborg-web-api.js');

let vara = { url : '/games'};
console.log(vara)
// add routes
router.get({ url : '/games'}, 'webapi.getAllGames');
router.get({ url : '/games/:name'}, 'webapi.getGame');
router.post({ url : '/groups'}, 'webapi.createGroup');
router.put({ url : '/groups/:id'}, 'webapi.updateGroup');
router.get({ url : '/groups'}, 'webapi.getAllGroups');
router.get({ url : '/groups/:id'}, 'webapi.getGroup');
router.put({ url : '/groups/:id/games/:name'}, 'webapi.addGameToGroup');
router.delete({ url : '/groups/:id/games/:name'}, 'webapi.removeGameFromGroup');
router.get({ url : '/groups/:id/games'}, 'webapi.getGamesFromGroup');
//console.log(router.routes);

// find
router.navigate({ url : '/games'}, {});
router.navigate({ url : '/games/1/1'}, {});
router.navigate({ url :'GET /games/quintela'}, {});
router.navigate({ url :'PUT /groups/10/games/xadrez'}, {});