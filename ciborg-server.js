'use strict';
const http = require('http');

const express = require('express');
const server = express();


const props = require('./libs/CIBORG/shared/Config')("./libs/CIBORG/shared/files");
const gamesDto = require('./libs/CIBORG/entities/dtos/GameDto');
const gamesEntity = require('./libs/CIBORG/entities/models/Game');
const gamesDtoMapper = require('./libs/CIBORG/entities/mappers/GameDtoMapper')(gamesEntity);
const ciborgError = require('./libs/CIBORG/errors/ciborg-error');
const httpCall = require('./libs/CIBORG/request/HttpCall')(props, ciborgError);
const ciborgValidator = require('./libs/CIBORG/validators/ciborg-validator')(ciborgError);
const gamesService = require('./libs/CIBORG/dal/board-games-data')(props, gamesDto, gamesDtoMapper, httpCall, ciborgError);
const groupService = require('./libs/CIBORG/dal/ciborg-db')(props, httpCall, gamesService, ciborgError);
const services = require('./libs/CIBORG/services/ciborg-services')(gamesService, groupService);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api')(props, services, ciborgError, ciborgValidator);

const authentication = require('./libs/CIBORG/middleware/authentication')(props, ciborgError);

server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true }))
server.use(authentication);
//Register routes
server.get('/games', webapi.getMostPopularGames);
server.get('/games/:name', webapi.getGameByName);
server.post('/groups', webapi.createGroup);
server.put('/groups', webapi.updateGroup);
server.get('/groups', webapi.getAllGroups);
server.get('/groups/:id', webapi.getGroup);
server.put('/groups/games', webapi.addGameToGroup);
server.delete('/groups/games', webapi.removeGameFromGroup);
server.get('/groups/:id/games', webapi.getGamesFromGroup);
//server.get('/');

server.use(function (req, res, next) {
    let err = new ciborgError(
        'No routes implemented yet.',
        'Command does not exist.',
        '404' // Not Found
        );
        err.resolveErrorResponse(res);
    })

server.listen(props.config.port, () => console.log("Listening so port:", props.config.port));