'use strict';
const request = require('request');   

function createHttpRequest(options,resolved, rejected){
    //const config = require('ConfigFile');
        // Do async call
    // request.get(options, function(err, resp, body) {
    //     if (err) {
    //         rejected(err);
    //     } else {
    //         resolved(JSON.parse(body));
    //     }
    // })
    resolved({
        id: 1,
        name: 'Game1'
    });
};

function searchGamesByGroup(id, cb){
    // Setting URL and headers for request
    var options = {
        url: 'cenas',
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
        return cb(data);
    };

    function rejected(err){
        console.log('id:' + id);
    };

    return createHttpRequest(options, resolved, rejected);
        
};
    
function searchByName(gameName, cb){
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
            
    };

    function rejected(err){

    };

    return createHttpRequest(options, resolved,rejected);
};

function getAllGames(cb){
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
            
    };

    function rejected(err){

    };

    return createHttpRequest(options, resolved,rejected);
};

let ciborgGamesServices = {

    getGamesByGroupID: searchGamesByGroup,
    searchByName: searchByName,
    getAllGames: getAllGames,

};

module.exports = ciborgGamesServices;