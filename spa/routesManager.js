const controller = require('./controller');
const views = require('./viewManager');

module.exports = {

    home: {
        controller: controller.home,
        view: views.home
    },

    getAllUserGroups : {
        controller : controller.getAllUserGroups,
        view : views.getAllUserGroups
    },

    createGroup : {
        controller : controller.createGroup,
        view : views.createGroup
    },

    table: {
        controller: controller.table,
        view: views.table
    },

    gameList: {
        controller: controller.gameList,
        view: views.gameList
    },

    login: {
        controller: controller.login,
        view: views.login
    }
}