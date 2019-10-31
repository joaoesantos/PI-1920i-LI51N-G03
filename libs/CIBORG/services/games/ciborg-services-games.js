'use strict';
const request = require('request');   
//const config = require('../../shared/Config.js');
let GameDto = require('../../entities/dtos/GameDto.js');
let gameMapper = require('../../entities/mappers/GameDtoMapper.js');


function createHttpRequest(options,resolved, rejected){
    request.get(options, function(err, resp, body) {
        if (err) {
            rejected(err);
        } else {
            resolved(JSON.parse(body));
        }
    })
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
        url: `https://www.boardgameatlas.com/api/search?name=${gameName}&client_id=rFMyVCTRWP`,
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
        console.log(data.games.length);
        let arr = data.games.map(function(g) {

        let dto = new GameDto(
                    g.id, 
                    g.name,
                    g.year_published, 
                    g.min_players, 
                    g.max_players, 
                    g.min_playtime, 
                    g.max_playtime, 
                    g.min_age, 
                    g.description,
                    g.description_preview,
                    g.price,
                    g.primary_publisher,
                    g.num_user_ratings,
                    g.average_user_rating
                    );
            return gameMapper.entityToModel(dto);
        })

        
        cb(arr);
    };

    function rejected(err){
        console.log(err);
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