"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');

const templates = require('./templateManager');

module.exports = {
    home: home,
    table: table,
}

function home(data, routeManager) {
    routeManager.setMainContent(templates.home(data));
}

function table(data, routeManager) {
    routeManager.setMainContent(templates.table(data));
}