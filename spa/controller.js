"use strict";

const groups = require('./model/groups');

module.exports = {
    home: async function() {
        const img = require('./images/istockphoto.jpg').default;
        return img;
    },

    login: async function(){
        console.log('???????????');
    },

    games: async function(){

        let gameList = await fetch('/popularGames',{
            method: 'GET',
            headers: {"Content-Type": "application/json"}
          })
        
        console.log('gameslist: ', gameList.payload);
        return gameList;
    },

    // groups models
    getAllUserGroups: async function () {
        return groups.getAllUserGroups();
    },

    createGroup: async function (data) {
        return groups.createGroup(data.name, data.description);
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
    }

}