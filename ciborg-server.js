'use strict';
const http = require('http');

const gamesDto = require('./libs/CIBORG/entities/dtos/GameDto');
const gamesEntity = require('./libs/CIBORG/entities/models/Game');
const gamesDtoMapper = require('./libs/CIBORG/entities/mappers/GameDtoMapper')(gamesEntity);
const CiborgError = require('./libs/CIBORG/errors/ciborg-error');
const httpCall = require('./libs/CIBORG/request/HttpCall')(CiborgError);
const Props = require('./libs/CIBORG/shared/Config')("./libs/CIBORG/shared/files");
const CiborgValidator = require('./libs/CIBORG/webapi/validator')(CiborgError);
const gamesService = require('./libs/CIBORG/dal/board-games-data')(Props, gamesDto, gamesDtoMapper, httpCall, CiborgError);
const groupService = require('./libs/CIBORG/dal/ciborg-db')(Props, httpCall, gamesService, CiborgError);
const services = require('./libs/CIBORG/services/ciborg-services')(gamesService, groupService);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api')(services, CiborgError, CiborgValidator);
const router = require('./libs/CIBORG/webapi/router')(CiborgError);

//Register routes
router.get('/games', webapi.getMostPopularGames);
router.get('/games/:name', webapi.getGameByName);
router.post('/groups', webapi.createGroup);
router.put('/groups', webapi.updateGroup);
router.get('/groups', webapi.getAllGroups);
router.get('/groups/:id', webapi.getGroup);
router.put('/groups/games', webapi.addGameToGroup);
router.delete('/groups/games', webapi.removeGameFromGroup);
router.get('/groups/:id/games', webapi.getGamesFromGroup);

const server = http.createServer(router);

server.listen(Props.config.port, () => console.log("Listening so port:", Props.config.port));