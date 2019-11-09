"use strict";

var Group = class Group {
    #_id;
    #_name;
    #_description;
    #_games;
    constructor(id, name, min_playtime, max_playtime) {
        this.#_id = id;
        this.#_name = name;
        this.#_description = min_playtime;
        this.#_games = [];
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
        return this.#_games;
    }
};
module.export = Group