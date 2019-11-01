"use strict";

var Game = class Game {
    #_id;
    #_name;
    #_min_playtime;
    #_max_playtime;
    constructor(id, name, min_playtime, max_playtime) {
        this.#_id = id;
        this.#_name = name;
        this.#_min_playtime = min_playtime;
        this.#_max_playtime = max_playtime;
     }

     get id() {
         return this.#_id;
     }

     get name() {
        return this.#_name;
    }

    get min_playtime() {
        return this.#_min_playtime;
    }

    get max_playtime() {
        return this.#_max_playtime;
    }
};
module.exports = Game