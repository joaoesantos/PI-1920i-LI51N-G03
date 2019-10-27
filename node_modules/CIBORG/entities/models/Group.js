"use strict";

const services = require('./services/ciborg-services.js');

var Group = class Group {
    #id;
    #name;
    #description;
    #games;
    constructor(id, name, min_playtime, max_playtime) {
        this.#id = id;
        this.#name = name;
        this.#description = min_playtime;
        this.#games = null;
    }

    get id() {
        return this.#id;
    }

    get name() {
       return this.#name;
    }

    get description() {
        return this.#description;
     }

    get games() {
        if(this.#games === null) {
            this.#games = services.games.getGamesByGroupID(this.#id);
        }
        return this.#games;
    }
};
module.export = Group