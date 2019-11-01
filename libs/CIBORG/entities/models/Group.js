"use strict";

const services = require('./services/ciborg-services.js');

var Group = class Group {
    #_id;
    #_name;
    #_description;
    #_games;
    constructor(id, name, min_playtime, max_playtime) {
        this.#_id = id;
        this.#_name = name;
        this.#_description = min_playtime;
        this.#_games = null;
    }

    get id() {
        return this.#_id;
    }

    get name() {
        return this.#_name;
    }

    get description() {
        return this.#_description;
    }

    get games() {
        if (this.#_games === null) {
            this.#_games = services.games.getGamesByGroupID(this.#_id);
        }
        return this.#_games;
    }
};
module.export = Group