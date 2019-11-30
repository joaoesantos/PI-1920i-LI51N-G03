'use strict';

let ciborgServices = function(gamesService, groupsService){
    let services = {
        games: gamesService,
        groups: groupsService
    };
    return services;
};

module.exports = ciborgServices;