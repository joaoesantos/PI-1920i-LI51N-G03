"use strict";

const groups = require('./model/groups');
const games = require('./model/games');

module.exports = {
    home: async function() {
        const img = require('./images/ciborgChess.jpeg').default;
        return img;
    },

    // groups models
    getAllUserGroups: async function () {
        return groups.getAllUserGroups();
    },

    createGroup: async function (group) {
        return groups.createGroup(group.name, group.description);
    },

    table: async function() {
        let gameTable = {
            header: ["H1", "H2", "H3"],
            elements: [{
                    h1: "lala",
                    p2: "lele",
                    lge: "rbgegr"
                },
                {
                    h1: "rrrrrrrrr",
                    p2: "eeeeeeeeee",
                    lge: "tttttttttt"
                }
            ]
        };
        return gameTable;
    },

    login: async function(){
        console.log('???????????');
    },

    games: async function(){

        let gameList = await games.getMostPopularGames();
        
        return gameList.payload;
    },

    searchGamesByName: async function(name){
        if(!name){
            name = "";
        }

        let gameList = await games.searchGamesByName(name);
        return gameList.payload;
    },

}