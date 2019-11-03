'use strict';

let ciborgServices = (function(){

    const getGamesServices  = function(req, res){
        return require('./games/ciborg-services-games');
    };

    const getGroupsServices  = function(req, res){
        return require('./groups/ciborg-services-group');
    };

    let services = {
        games: getGamesServices,
        groups: getGroupsServices
    };

    return services;
});

module.exports = ciborgServices;