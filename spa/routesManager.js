'use strict';

const controller = require('./controller');
const views = require('./viewManager');

module.exports = {

    header: {
        controller: controller.header,
        view: views.header
    },

    home: {
        controller: controller.home,
        view: views.home
    },

    signIn: {
        controller: controller.signIn,
        view: views.signIn
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

    removeGameFromGroup: {
        controller: controller.removeGameFromGroup,
        view: views.removeGameFromGroup
    }
}