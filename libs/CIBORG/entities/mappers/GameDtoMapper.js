"use strict";

//const Game = require('./Game');

function GamesDtoMapper(game){
    console.log('game', Object.keys(game(9,8,7,6)));
    function entityToModel(gameDto){
        return game(
            gameDto.id,
            gameDto.name,
            gameDto.min_playtime,
            gameDto.max_playtime
        );
    };

    return {
        entityToModel: entityToModel
    };
}

// var GamesDtoMapper = class GamesDtoMapper {
//     constructor(game){
//         this.Game = game;
//         console.log('1',Object.keys[this.Game]);
//     }
//     entityToModel(gameDto) {

//         console.log('2',Object.keys[this.Game])
//         return new this.Game(
//             gameDto.id,
//             gameDto.name,
//             gameDto.min_playtime,
//             gameDto.max_playtime
//         );
//     }
// };
module.exports = GamesDtoMapper