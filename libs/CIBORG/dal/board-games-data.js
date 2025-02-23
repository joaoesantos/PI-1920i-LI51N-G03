'use strict';

const debug = require('debug')('board-games-data');

module.exports = function(Props, GamesDto, GamesDtoMapper, HttpCall, CiborgError) {

    function queryBuilder(pairArray, keyValueSeparator, pairSeparator) {
        return pairArray.map(e => e.key + keyValueSeparator + e.value).reduce((accum, currVal) => accum + pairSeparator + currVal, "").substr(1);
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
        try {
            debug.extend('getMostPopularGames')('Handling HTTP GET');
            let data = await HttpCall.get(options);
            debug.extend('getMostPopularGames')('All games were retrieved with success.');
            return {
                statusCode: 200,
                body: data.body.games
            };
        } catch(err) {
            debug.extend('getMostPopularGames')(err);
            if(!(err instanceof CiborgError)) {
                throw new CiborgError(err,
                    'Error calling external service: getMostPopularGames.',
                    'Unable to get popular games.',
                    '500' //Service Unavailable
                );
            }
            throw err;
            
        }    
    }

    async function getGamesByID(idArray) {
        let query = queryBuilder([
            {key: Props.api.client_id_param, value: Props.api.client_id_value},
            {key: "ids", value: idArray.join(",")}
        ], "=", "&");
        // Setting URL and headers for request
        let options = { url: Props.api.base_url + Props.api.search_api 
            + "?" + query, json: true };
        try{
            debug.extend('getGamesByID')('Handling HTTP GET');
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
            debug.extend('getGamesByID')('Game ' +  games.id + ' was retrieved with success.');
            return {
                statusCode: 200,
                body: games
            };
        } catch(err) {
            debug.extend('getGamesByID')(err);
            if(!(err instanceof CiborgError)) {
                throw new CiborgError(err,
                    'Error calling external service: getGamesByID.',
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
        // Setting URL and headers for request
        let options = { url: Props.api.base_url + Props.api.search_api 
            + "?" + query + "&" + Props.api.search_api_fields_filter, json: true };
        try {
            debug.extend('searchByName')('Handling HTTP GET');
            let data = await HttpCall.get(options);
            debug.extend('searchByName')('List of games with name ' +  gameName + ' was retrieved with success.');
            return {
                statusCode: 200,
                body: data.body.games
            }
        } catch(err) {
            debug.extend('searchByName')(err);
            if(!(err instanceof CiborgError)) {
                throw new CiborgError(err,
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
        getGamesByID: getGamesByID,
    }
    
};