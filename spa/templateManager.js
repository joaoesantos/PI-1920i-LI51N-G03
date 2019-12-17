const Handlebars = require('../node_modules/handlebars/dist/handlebars');

const home = require("./templates/home.hbs").default;
const table = require("./templates/table.hbs").default;

module.exports = {
    home : Handlebars.compile(home),
    table : Handlebars.compile(table)
};