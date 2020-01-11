'use strict';

const Handlebars = require('../node_modules/handlebars/dist/handlebars');

const header = require("./templates/header.hbs").default;
const home = require("./templates/home.hbs").default;
const signIn = require("./templates/signIn.hbs").default;
const login = require("./templates/login.hbs").default;
const gameList = require("./templates/gameList.hbs").default;
const groups = require("./templates/groups.hbs").default;
const group = require("./templates/groupDetail.hbs").default;

module.exports = {
    header: Handlebars.compile(header),
    home: Handlebars.compile(home),
    signIn: Handlebars.compile(signIn),
    login: Handlebars.compile(login),
    games: Handlebars.compile(gameList),
    groups: Handlebars.compile(groups),
    group: Handlebars.compile(group)
};