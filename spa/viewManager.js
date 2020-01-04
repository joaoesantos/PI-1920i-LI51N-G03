"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
require('../spa/stylesheets/login.css');

const templates = require('./templateManager');

module.exports = {
    home: home,
    table: table,
    login: login,
    gameList: gameList,
}

function home(data, routeManager) {
    routeManager.setMainContent(templates.home(data));
}

function table(data, routeManager) {
    routeManager.setMainContent(templates.table(data));
}

function login(data, routeManager){
    routeManager.setMainContent(templates.login(data));
}

function gameList(data, routeManager){
    routeManager.setMainContent(templates.gameList(data));
}