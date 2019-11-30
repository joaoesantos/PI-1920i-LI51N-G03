'use strict';
var debug = require('debug')('board-games-data');
debug.enabled = true;

module.exports = function(Props, GamesDto, GamesDtoMapper, HttpCall, CiborgError) {

    // enables or disables debug according to configuration file
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
        let options = { url: Props.api.base_url + Props.api.search_api + "?" + query};

        return options;
    }

    async function getMostPopularGames() {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "order_by", value: "popularity"},
            {key: "ascending", value: "false"}
        ], "=", "&");
        // Setting URL and headers for request
        let options = { url: Props.api.base_url + Props.api.search_api 
            + "?" + query + "&" + Props.api.search_api_fields_filter, json: true };

        try{
            let data = await HttpCall.get(options);
            debug.extend('getMostPopularGames').extend('handler')('Handling HTTP GET');

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

            return {
                statusCode: 200,
                body: games
            };
        }catch(err){
            if(!(err instanceof CiborgError)){
                throw new CiborgError(
                    'Error calling external service: getMostPopularGames.',
                    'Unable to get popular games.',
                    '500' //Service Unavailable
                );
            }
            throw err;
            
        }    
    }

    async function getGameByID(id){
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "ids", value: id}
        ], "=", "&");
        let options = { url: Props.api.base_url + Props.api.search_api 
            + "?" + query + "&" + Props.api.search_api_fields_filter, json: true };
        try{
            let data = await HttpCall.get(options);
            debug.extend('getGameByID').extend('handler')('Handling HTTP GET');
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

            return {
                statusCode: 200,
                body: games
            };
        }catch(err){

            if(!(err instanceof CiborgError)){
                throw new CiborgError(
                    'Error calling external service: getGameByID.',
                    'Unable to get game.',
                    '500' //Service Unavailable
                );
            }
            throw err;
        }
    }

    async function searchByName(gameName) {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "name", value: gameName}
        ], "=", "&");
        let options = { url: Props.api.base_url + Props.api.search_api 
            + "?" + query + "&" + Props.api.search_api_fields_filter, json: true };

        try{
            debug.extend('getGameByID').extend('handler')('Handling HTTP GET');
            let data = await HttpCall.get(options);
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

            return {
                statusCode: 200,
                body: games
            }
        }catch(err){
            if(!(err instanceof CiborgError)){
                throw new CiborgError(
                    'Error calling external service:: searchByName.',
                    'Unable to search games.',
                    '500' //Service Unavailable
                );
            }

            throw err;
        }
    };

    return {
        searchByName: searchByName,
        getMostPopularGames: getMostPopularGames,
        getGameByID: getGameByID,
    }
    
};