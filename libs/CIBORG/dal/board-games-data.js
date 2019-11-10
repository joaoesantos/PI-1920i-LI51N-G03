'use strict';
var debug = require('debug')('board-games-data');

module.exports = function(Props, GamesDto, GamesDtoMapper, HttpCall, CiborgError) {
    if(!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }
    function queryBuilder(pairArray, keyValueSeparator, pairSeparator) {
        return pairArray.map(e => e.key + keyValueSeparator + e.value).reduce((accum, currVal) => accum + pairSeparator + currVal, "").substr(1);
    }

    function createOptionsForGamesOrderedByField(number,field,ascending) {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "limit", value: number},
            {key: "order_by", value: field},
            {key: "ascending", value: ascending},
        ], "=", "&");
        let options = {
            url: Props.api.base_url + Props.api.search_api + "?" + query,
            headers: {
                'User-Agent': 'request'
            }
        };

        return options;
    }

    function getMostPopularGames(cb) {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "order_by", value: "popularity"},
            {key: "ascending", value: "false"}
        ], "=", "&");
        // Setting URL and headers for request
        let options = {
            url: Props.api.base_url + Props.api.search_api + "?" + query,
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        function handler(err, data) {
            debug.extend('getMostPopularGames').extend('handler')("Handling HTTP GET");
            try {
                if(err) {
                    debug.extend('getMostPopularGames').extend('handler')(err);
                    cb(err);
                } else {
                    let games = data.body.games.map(function(g) {
        
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
                    cb(null, {
                        statusCode: 201,
                        statusMessage: "accepted",
                        body: {games}
                        });
                }
            } catch(err) {
                debug.extend('getMostPopularGames').extend('handler')(err);
                cb(
                    new CiborgError(
                    'Error calling external service: getMostPopularGames.',
                    'Unable to get popular games.',
                    '500' //Service Unavailable
                ));
            }
        }
        HttpCall.get(options, handler);
    }

    function getGameByID(id, cb){
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "ids", value: id}
        ], "=", "&");
        let options = {
            url: Props.api.base_url + Props.api.search_api + "?" + query,
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        function handler(err, data){
            debug.extend('getGameByID').extend('handler')("Handling HTTP GET");
            try {
                if(err) {
                    debug.extend('getGameByID').extend('handler')(err);
                    cb(err);
                } else {
                    let games = data.body.games.map(function(g) {
        
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
                }
            } catch(err){
                debug.extend('getGameByID').extend('handler')(err);
                cb(new CiborgError(
                    'Error calling external service: getGameByID.',
                    'Unable to get game.',
                    '500' //Service Unavailable
                ));
            } 
        };
        HttpCall.get(options, handler);
    }

    function searchByName(gameName, cb) {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "name", value: gameName}
        ], "=", "&");
        let options = {
            url: Props.api.base_url + Props.api.search_api + "?" + query,
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        function handler(err, data) {
            debug.extend('getGameByID').extend('handler')("Handling HTTP GET");
            try {
                if(err) {
                    debug.extend('getGameByID').extend('handler')(err);
                    cb(err);
                } else {
                    let games = data.body.games.map(function(g) {
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
                    body : games
                    });
                }
            } catch(err) {
                debug.extend('getGameByID').extend('handler')(err);
                cb(new CiborgError(
                    'Error calling external service:: searchByName.',
                    'Unable to search games.',
                    '500' //Service Unavailable
                ));
            }  
        };
        HttpCall.get(options, handler);
    };

    return {
        searchByName: searchByName,
        getMostPopularGames: getMostPopularGames,
        getGameByID: getGameByID,
    }
    
};