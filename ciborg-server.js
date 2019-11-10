'use strict';
const http = require('http');

const config = {
    port: 8080,
}

const gamesDto = require('./libs/CIBORG/entities/dtos/GameDto');
const gamesEntity = require('./libs/CIBORG/entities/models/Game');
const gamesDtoMapper = require('./libs/CIBORG/entities/mappers/GameDtoMapper')(gamesEntity);
const CiborgError = require('./libs/CIBORG/errors/ciborg-error');
const httpCall = require('./libs/CIBORG/request/HttpCall')(CiborgError);
const Props = require('./libs/CIBORG/shared/Config');
const CiborgValidator = require('./libs/CIBORG/webapi/validator')(CiborgError);
const gamesService = require('./libs/CIBORG/dal/board-games-data')(Props, gamesDto, gamesDtoMapper, httpCall, CiborgError);
const groupService = require('./libs/CIBORG/dal/ciborg-db')(Props, httpCall, gamesService, CiborgError);
const services = require('./libs/CIBORG/services/ciborg-services')(gamesService, groupService);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api')(services, CiborgError, CiborgValidator);
const router = require('./libs/CIBORG/webapi/router')(CiborgError);

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

server.listen(config.port, () => console.log("Listening so port:", config.port));