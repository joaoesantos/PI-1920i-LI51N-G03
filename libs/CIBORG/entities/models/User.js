"use strict";

var User = class User {
    #_name;
    #_userId;
    #_password;
    constructor(userId, name, password) {
        this.#_userId = userId
        this.#_name = name;
        this.#_password = password;
    }

    get userId() {
        return this.#_userId;
    }

    get name() {
        return this.#_name;
    }

    get password() {
        return this.#_password;
    }
};
module.export = User;