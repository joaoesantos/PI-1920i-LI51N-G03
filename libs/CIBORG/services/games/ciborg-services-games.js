'use strict';
const request = require('request');   
const client_id = 'rFMyVCTRWP';

module.exports = function(GamesDto, GamesDtoMapper, HttpCall){

    console.log
    function getAllGames(cb){
        // Setting URL and headers for request
        var options = {
            url: '',
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
                
        };
    
        function rejected(err){
    
        };
    
    };

    function getGameByID(id, cb){

        //let gamesIds = 'kPDxpJZ8PD'
    
        let options = {
            url: `https://www.boardgameatlas.com/api/search?ids=${id}&client_id=${client_id}`,
            headers: {
                'User-Agent': 'request'
            }
        };
    
        function resolved(data){
            let arr = data.games.map(function(g) {
    
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
        
                    console.log(
                        'id:',
                        dto.id,
                        ',name:',
                        dto.name,
                        ',min_playtime:',
                        dto.min_playtime,
                        ',max_playtime:',
                        dto.max_playtime
                    );
    

                    return GamesDtoMapper.entityToModel(dto);
                });
    
            cb(arr);
        };
    
        function rejected(err){
            console.log('id:' + id);
        };
    
        return HttpCall.get(options, resolved, rejected);
    }

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
    
            let dto = new GamesDto(
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
    
                console.log(
                    'id:',
                    dto.id,
                    ',name:',
                    dto.name,
                    ',min_playtime:',
                    dto.min_playtime,
                    ',max_playtime:',
                    dto.max_playtime
                );
    
                let mapper = new GamesDtoMapper();
    
                return mapper.entityToModel(dto);
            });
    
            
            cb(arr);
        };
    
        function rejected(err){
            console.log(err);
        };
    
        return createHttpRequest(options, resolved,rejected);
    };

    return {
        searchByName: searchByName,
        getAllGames: getAllGames,
        getGameByID: getGameByID,
    }
};