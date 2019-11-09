"use strict";

function GameEntity(id, name, min_playtime, max_playtime){
    let game = {
        id: id,
        name: name,
        min_playtime: min_playtime,
        max_playtime: max_playtime
    };

    return game;
}

module.exports = GameEntity