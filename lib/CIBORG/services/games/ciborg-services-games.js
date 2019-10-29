'use strict';

const https = require('https');
const request = require('request');   

async function createHttpRequest(options,resolved, rejected){
    //const config = require('ConfigFile');
    // Return new promise 
    return new Promise(function() {
        // Do async call
        request.get(options, function(err, resp, body) {
            if (err) {
                rejected(err);
            } else {
                resolved(JSON.parse(body));
            }
        })
    })
};

async function searchGamesByGroup(id){
    // Setting URL and headers for request
    var options = {
        url: 'cenas',
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
        return {
            id: 1,
            
        }
    };

    function rejected(err){
        console.log('id:' + id);
    };

    return await createHttpRequest(options, resolved,rejected);
        
};
    
async function searchByName(gameName){
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

    return await createHttpRequest(options, resolved,rejected);
};

async function getAllGames(){
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

    return await createHttpRequest(options, resolved,rejected);
};

let ciborgGamesServices = {

    getGamesByGroupID: searchGamesByGroup,
    searchByName: searchByName,
    getAllGames: getAllGames,

};

module.exports = ciborgGamesServices;