'use strict';
const http = require('http');

const config = {
    port: 8080,
}

const router = require('./libs/CIBORG/webapi/router');
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api');
const gamesDto = require('./libs/CIBORG/entities/dtos/GameDto');
const gamesEntity = require('./libs/CIBORG/entities/models/Game');
const gamesDtoMapper = require('./libs/CIBORG/entities/mappers/GameDtoMapper')(gamesEntity);
const httpCall = require('./libs/CIBORG/request/HttpCall');
const gamesService = require('./libs/CIBORG/services/games/ciborg-services-games')(gamesDto,gamesDtoMapper,httpCall);
const groupService = require('./libs/CIBORG/services/groups/ciborg-services-group');
const services = require('./libs/CIBORG/services/games/ciborg-services-games')(gamesService, groupService);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api.js')(services);
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