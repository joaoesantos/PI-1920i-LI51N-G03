"use strict";

var Game = class Game {
    #id;
    #name;
    #min_playtime;
    #max_playtime;
    constructor(id, name, min_playtime, max_playtime) {
        this.#id = id;
        this.#name = name;
        this.#min_playtime = min_playtime;
        this.#max_playtime = max_playtime;
     }

     get id() {
         return this.#id;
     }

     get name() {
        return this.#name;
    }

    get min_playtime() {
        return this.#min_playtime;
    }

    get max_playtime() {
        return this.#max_playtime;
    }
};
module.export = Game