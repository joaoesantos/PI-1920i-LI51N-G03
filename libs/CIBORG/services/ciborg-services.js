'use strict';

let ciborgServices = function(gamesService, groupsService, userService) {
    let services = {
        games: gamesService,
        groups: groupsService,
        users: userService
    };
    return services;
};

module.exports = ciborgServices;