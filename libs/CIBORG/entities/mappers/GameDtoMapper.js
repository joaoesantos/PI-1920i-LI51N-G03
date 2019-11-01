"use strict";

const Game = require('../models/Game.js');

var GamesDtoMapper = class GamesDtoMapper {
    entityToModel(gameDto) {
        return new Game(
            gameDto.id,
            gameDto.name,
            gameDto.min_playtime,
            gameDto.max_playtime
        );
    }
};
module.exports = GamesDtoMapper