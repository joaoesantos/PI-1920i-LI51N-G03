'use strict';

const clientSideConfigs = require("../clientSideConfigs");

module.exports = {
    getMostPopularGames: getMostPopularGames,
    searchGamesByName: searchGamesByName
};

function GamesApiUris() {
    const baseUri = clientSideConfigs.apiBaseUrl;

    this.getMostPopularGames = () => `${baseUri}/games`
    this.searchGamesByName = (name) => `${baseUri}/games/${name}`
}

const Uris = new GamesApiUris()

function getMostPopularGames() {
    const options = {
        method: "GET",
        headers: clientSideConfigs.defaultHeaders
    };
    return fetch(Uris.getMostPopularGames(), options)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
}

function searchGamesByName(name) {
    const options = {
        method: "GET",
        headers: clientSideConfigs.defaultHeaders
    }
    let res = fetch(Uris.searchGamesByName(name), options)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })

    return res;
}