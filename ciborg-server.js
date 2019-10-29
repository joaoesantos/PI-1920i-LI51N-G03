'use strict';
const http = require('http');

const router = require('./CIBORG/webapi/router');
const webapi = require('-/CIBORG/webapi/ciborg-web-api');

//Register routes
//webApi.get('/',services.home());
router.get('/games', webapi.getAllGames);
router.get('/games/:name', webapi.getGame);
router.post('/games', webapi.createGroup);
router.put('/games/:id', webapi.updateGroup);
router.get('/groups', webapi.getAllGroups);
router.get('/groups/:id', webapi.getGroup);
router.put('/groups/:id/games/:name', webapi.addGameToGroup);
router.delete('/groups/:id/games/:name', webapi.removeGameFromGroup);
router.get('/groups/:id/games', webapi.getGamesFromGroup);

const server = http.createServer(router);
// config variables
const config = require('./shared/config.js');
server.listen(config.port, () => console.log("Listening so port:", config.port));