'use strict';

const express = require('express');
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

const server = express();
const debug = require('debug')('server');

const props = require('./libs/CIBORG/shared/Config')("./libs/CIBORG/shared/files");
const ciborgError = require('./libs/CIBORG/errors/ciborg-error');
const passportInitialize = require("./libs/CIBORG/authentication/passport-config")(bcrypt, localStrategy, ciborgError);
const gamesDto = require('./libs/CIBORG/entities/dtos/GameDto');
const gamesEntity = require('./libs/CIBORG/entities/models/Game');
const gamesDtoMapper = require('./libs/CIBORG/entities/mappers/GameDtoMapper')(gamesEntity);
const httpCall = require('./libs/CIBORG/request/HttpCall')(props, ciborgError);
const ciborgValidator = require('./libs/CIBORG/validators/ciborg-validator')(ciborgError);
const gamesService = require('./libs/CIBORG/dal/board-games-data')(props, gamesDto, gamesDtoMapper, httpCall, ciborgError);
const groupService = require('./libs/CIBORG/dal/ciborg-db')(props, httpCall, gamesService, ciborgError);
const userService = require('./libs/CIBORG/dal/ciborg-users')(props, httpCall, ciborgError);
const services = require('./libs/CIBORG/services/ciborg-services')(gamesService, groupService, userService);
passportInitialize(passport, userService.getUserById);
const webapi = require('./libs/CIBORG/webapi/ciborg-web-api')(props, services, ciborgError, ciborgValidator, passport);

const router = require('./libs/CIBORG/middleware/router')(express.Router(), webapi);



server.use(session({
    secret: "secret-key", //devia estar no ficheiro de propriedades
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());


server.use(express.json()); // for parsing application/json
server.use('/', express.static('dist'));

server.use(router);

server.use(function(req, res, next) {
    let err = new ciborgError(null,
        'No routes implemented yet.',
        'Command does not exist.',
        '404' // Not Found
    );
    err.resolveErrorResponse(res);
})

server.listen(props.config.port, () => console.log("Listening to port:", props.config.port));