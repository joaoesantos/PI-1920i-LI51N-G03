'use strict';

module.exports = {
    getMostPopularGames: getMostPopularGames,
    searchGamesByName: searchGamesByName
};

function GamesApiUris() {
    const baseUri = 'http://localhost:8500/'

    this.getMostPopularGames = () => `${baseUri}games`
    this.searchGamesByName = () => `${baseUri}games/`
}

const Uris = new GamesApiUris()

function getMostPopularGames() {
    return fetch(Uris.getMostPopularGames())
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
        headers: {
            "Content-Type": "application/json"
        }
    }
    let res = fetch(Uris.searchGamesByName() + name, options)
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

module.exports = {
    getMostPopularGames: getMostPopularGames,
    searchGamesByName: searchGamesByName
}