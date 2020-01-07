'use strict';

const controller = require('./controller');
const views = require('./viewManager');

module.exports = {

    home: {
        controller: controller.home,
        view: views.home
    },

    login: {
        controller: controller.login,
        view: views.login
    },

    logout: {
        controller: controller.logout,
        view: views.logout
    },

    games: {
        controller: controller.games,
        view: views.games
    },

    groups: {
        controller: controller.groups,
        view: views.groups
    },

    createGroup: {
        controller: controller.createGroup,
        view: views.createGroup
    },

    searchGames: {
        controller: controller.searchGamesByName,
        view: views.searchGamesByName
    },
    group: {
        controller: controller.group,
        view: views.group
    },

    updateGroup: {
        controller: controller.updateGroup,
        view: views.updateGroup
    },

    addGameToGroup: {
        controller: controller.addGameToGroup,
        view: views.addGameToGroup
    },

    table: {
        controller: controller.table,
        view: views.table

    }

}