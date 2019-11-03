"use strict";

const Game = require('./Game');


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