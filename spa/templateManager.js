const Handlebars = require('../node_modules/handlebars/dist/handlebars');

const home = require("./templates/home.hbs").default;
const table = require("./templates/table.hbs").default;
const login = require("./templates/login.hbs").default;
const gameList = require("./templates/gameList.hbs").default;

module.exports = {
    home: Handlebars.compile(home),
    table: Handlebars.compile(table),
    login: Handlebars.compile(login),
    games: Handlebars.compile(gameList),
};