const controller = require('./controller');
const views = require('./viewManager');

module.exports = {

    home: {
        controller: controller.home,
        view: views.home
    },

    table: {
        controller: controller.table,
        view: views.table
    }
}