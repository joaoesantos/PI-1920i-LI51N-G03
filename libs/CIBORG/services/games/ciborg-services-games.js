'use strict';
const request = require('request');   
//const config = require('../../shared/Config.js');
const client_id = 'rFMyVCTRWP';
const GameDto = require('../../entities/dtos/GameDto.js');
const GamesDtoMapper = require('../../entities/mappers/GameDtoMapper.js');

const Game = require('../../entities/models/Game');

let options
function createHttpRequest(options,resolved, rejected){
    request.get(options, function(err, resp, body) {
        if (err) {
            rejected(JSON.parse(err));
        } else {
            resolved(JSON.parse(body));
        }
    })
};

function searchGamesByGroup(id, cb){
    
    //call elasticsearch to get gamesIds for a group


    let gamesIds = 'kPDxpJZ8PD'

    options = {
        url: `https://www.boardgameatlas.com/api/search?ids=${gamesIds}&client_id=${client_id}`,
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
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
                g.average_user_rating,
                );
    
                // console.log(
                //     'id:',
                //     dto.id,
                //     ',name:',
                //     dto.name,
                //     ',min_playtime:',
                //     dto.min_playtime,
                //     ',max_playtime:',
                //     dto.max_playtime
                // );

                let gamesMapper = new GamesDtoMapper();
                console.log('entity:', gamesMapper.entityToModel(dto));
                return new GamesDtoMapper().entityToModel(dto);
            });

            // let gamesMapper = new GamesDtoMapper();
            // console.log('gamesMapper',gamesMapper)
            // for(let prop in gamesMapper){
            //     console.log('prop:',prop);
            // }
       // console.log('array',arr);

        cb(arr);
    };

    function rejected(err){
        console.log('id:' + id);
    };

    return createHttpRequest(options, resolved, rejected);
        
};
    
function searchByName(gameName, cb){
    // Setting URL and headers for request
    var options = {
        url: `https://www.boardgameatlas.com/api/search?name=${gameName}&client_id=${client_id}`,
        headers: {
            'User-Agent': 'request'
        }
    };

    function resolved(data){
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
            g.average_user_rating,
            );

            for(prop in dto){
                console.log('dtoProp:', prop)
            }

            // console.log(
            //     'id:',
            //     dto.id,
            //     ',name:',
            //     dto.name,
            //     ',min_playtime:',
            //     dto.min_playtime,
            //     ',max_playtime:',
            //     dto.max_playtime
            // );

            let gamesMapper = new GamesDtoMapper();

            return new GamesDtoMapper().entityToModel(dto);
        });

        
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