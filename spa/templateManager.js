const Handlebars = require('../node_modules/handlebars/dist/handlebars');

const home = require("./templates/home.hbs").default;
const table = require("./templates/table.hbs").default;
const getAllUserGroups = require("./templates/getAllUserGroups.hbs").default;
const login = require("./templates/login.hbs").default;

module.exports = {
    home : Handlebars.compile(home),
    getAllUserGroups : Handlebars.compile(getAllUserGroups),
    table : Handlebars.compile(table),
    login : Handlebars.compile(login),
};