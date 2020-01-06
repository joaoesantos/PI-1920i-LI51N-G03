'use strict'

function GamesApiUris() {
    const baseUri = 'http://localhost:8500/'
  
    this.getMostPopularGames =  () => `${baseUri}games`
    this.searchGamesByName =  () => `${baseUri}games/`
}

const Uris = new GamesApiUris()

function getMostPopularGames(){
    return fetch(Uris.getMostPopularGames())
        .then(res => res.json())
}

function searchGamesByName(name){
    const options = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    }
    let res = fetch(Uris.searchGamesByName() + name, options)
        .then(res => res.json()) 

    console.log(res);
    return res;
}

module.exports  = {
    getMostPopularGames : getMostPopularGames,
    searchGamesByName : searchGamesByName
}