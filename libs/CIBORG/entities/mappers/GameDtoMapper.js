"use strict";

//const Game = require('./Game');

function GamesDtoMapper(game){

    function entityToModel(gameDto){
        
        let gameEntity = game(
                gameDto.id,
                gameDto.name,
                gameDto.min_playtime,
                gameDto.max_playtime
            );
        
        return gameEntity;
    };

    return {
        entityToModel: entityToModel
    };
}
module.exports = GamesDtoMapper