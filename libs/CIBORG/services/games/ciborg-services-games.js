'use strict';
const request = require('request');   
const client_id = 'rFMyVCTRWP';
const CiborgError = require('../../errors/ciborg-error');
module.exports = function(GamesDto, GamesDtoMapper, HttpCall){

    function createOptionsForGamesOrderedByField(number,field,ascending){
        let options = {
            url: `https://www.boardgameatlas.com/api/search?limit=${number}&client_id=${client_id}&order_by=${field}&ascending=${ascending}`,
            headers: {
                'User-Agent': 'request'
            }
        };

        return options;
    }

    function getMostPopularGames(cb){
        // Setting URL and headers for request
        var options = {
            url: `https://www.boardgameatlas.com/api/search?client_id=${client_id}&order_by=popularity&ascending=false`,
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
            try{
                let games = data.games.map(function(g) {
    
                    let dto = GamesDto(
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
    
                        return GamesDtoMapper.entityToModel(dto);
                    });

                    cb(null,{
                        statusCode: 201,
                        statusMessage: "accepted",
                        body: {games}
                        });
            }catch(e){
                cb(
                    new CiborgError(
                    'Error calling external service: getMostPopularGames.',
                    'Unable to get popular games.',
                    '500'));
            }
            

            
        };
    
        function rejected(err){
            cb(new CiborgError(
                'Error in service: getAllGames.',
                'Unable to get popular games.',
                '503' //Service Unavailable
            ));
        };

        return HttpCall.get(options, resolved, rejected);
    };

    function getGameByID(id, cb){
    
        let options = {
            url: `https://www.boardgameatlas.com/api/search?ids=${id}&client_id=${client_id}`,
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
            try{
                let games = data.games.map(function(g) {
    
                    let dto = GamesDto(
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
    
                        return GamesDtoMapper.entityToModel(dto);
                    });
    
                cb(null,{
                    statusCode: 201,
                    statusMessage: "accepted",
                    body: {games}
                    });
            }catch(e){
                cb(new CiborgError(
                    'Error calling external service: getGameByID.',
                    'Unable to get game.',
                    '500' //Service Unavailable
                ));
            }
            
        };
    
        function rejected(err){
            cb(new CiborgError(
                'Error in service: getGameByID.',
                'Unable to get game.',
                '503' //Service Unavailable
            ));
        };
    
        return HttpCall.get(options, resolved, rejected);
    }

    function searchByName(gameName, cb){
        let options = {
            url: `https://www.boardgameatlas.com/api/search?name=${gameName}&client_id=${client_id}`,
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
            try{
                let games = data.games.map(function(g) {
    
                    let dto = GamesDto(
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
            
                        return GamesDtoMapper.entityToModel(dto);
                    });
            
                    
                    cb(null,{
                        statusCode: 201,
                        statusMessage: "accepted",
                        body: {games}
                        });
            }catch(e){
                cb(new CiborgError(
                    'Error calling external service:: searchByName.',
                    'Unable to search games.',
                    '500' //Service Unavailable
                ));
            }
            
        };
    
        function rejected(err){
            cb(new CiborgError(
                'Error in service: searchByName.',
                'Unable to get popular games.',
                '503' //Service Unavailable
            ));
        };
    
        return HttpCall.get(options, resolved,rejected);
    };

    return {
        searchByName: searchByName,
        getMostPopularGames: getMostPopularGames,
        getGameByID: getGameByID,
    }
};