'use strict';
const request = require('request');   
const client_id = 'rFMyVCTRWP';

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

    function getMostPopularGames(number,cb){
        // Setting URL and headers for request
        var options = {
            url: `https://www.boardgameatlas.com/api/search?limit=${number}&client_id=${client_id}&order_by=popularity&ascending=false`,
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
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

            cb({
                statusCode: 201,
                statusMessage: "accepted",
                data: {games}
                });
        };
    
        function rejected(err){
            cb({
                statusCode: 501,
                statusMessage: "rejected",
                data: {games}
                });
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

            cb({
                statusCode: 201,
                statusMessage: "accepted",
                data: {games}
                });
        };
    
        function rejected(err){
            cb({
                statusCode: 501,
                statusMessage: "rejected",
                data: {games}
                });
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
    
            
            cb({
                statusCode: 201,
                statusMessage: "accepted",
                data: {games}
                });
        };
    
        function rejected(err){
            cb({
                statusCode: 501,
                statusMessage: "rejected",
                data: {games}
                });
        };
    
        return HttpCall.get(options, resolved,rejected);
    };

    return {
        searchByName: searchByName,
        getMostPopularGames: getMostPopularGames,
        getGameByID: getGameByID,
    }
};