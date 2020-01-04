"use strict";

var Group = class Group {
    #_owner;
    #_id;
    #_name;
    #_description;
    #_games;
    constructor(owner, id, name, min_playtime, max_playtime) {
        this.#_owner = owner;
        this.#_id = id;
        this.#_name = name;
        this.#_description = min_playtime;
        this.#_games = [];
    }

    get owner() {
        return this.#_owner;
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