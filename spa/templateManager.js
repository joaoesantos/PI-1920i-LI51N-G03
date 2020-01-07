'use strict';

const Handlebars = require('../node_modules/handlebars/dist/handlebars');

const home = require("./templates/home.hbs").default;
const login = require("./templates/login.hbs").default;
const gameList = require("./templates/gameList.hbs").default;
const searchGamesByName = require("./templates/gameSearch.hbs").default;
const groups = require("./templates/groups.hbs").default;
const group = require("./templates/groupDetail.hbs").default;

module.exports = {
    home: Handlebars.compile(home),
    login: Handlebars.compile(login),
    games: Handlebars.compile(gameList),
    searchGamesByName: Handlebars.compile(searchGamesByName),
    groups: Handlebars.compile(groups),
    group: Handlebars.compile(group)
};