'use strict';
const http = require('http');

const config = {
    port: 8080,
}

// CIBORG modules dependencies
const games = require('./libs/CIBORG/services/groups/ciborg-services-games.js');
const groups = require('./libs/CIBORG/services/groups/ciborg-services-groups.js');
const service = require('./libs/CIBORG/services/ciborg-services.js')(games)(groups);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api.js')(service);
const router = require('./libs/CIBORG/webapi/router.js');

//Register routes
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
//const config = require('./shared/config.js');
server.listen(config.port, () => console.log("Listening so port:", config.port));