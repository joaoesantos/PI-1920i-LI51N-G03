'use strict';

let ciborgServices = function(gamesService, groupsService){

    const getGamesServices  = function(req, res){
        return gamesService;
    };

    const getGroupsServices  = function(req, res){
        return groupsService;
    };

    let services = {
        games: getGamesServices,
        groups: getGroupsServices
    };

    return services;
};

module.exports = ciborgServices;