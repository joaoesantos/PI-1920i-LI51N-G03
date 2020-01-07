"use strict";

const groups = require('./model/groups');
const games = require('./model/games');

module.exports = {
    home: async function() {
        const img = require('./images/ciborgChess.jpeg').default;
        return img;
    },

    login: async function() {
        console.log('???????????');
    },

    games: async function() {

        let fromServer = await games.getMostPopularGames();
        return fromServer.payload;
    },

    // groups models
    getAllUserGroups: async function() {
        return groups.getAllUserGroups();
    },

    createGroup: async function(data) {
        return groups.createGroup(data.name, data.description);
    },

    group: async function(args) {
        if (args == null) {
            //dia ao utilizador que tem de por id
        }
        let id = args;
        return await groups.getGroup(id);
    },

    updateGroup: async function(args) {
        if (args == null) {
            //dia ao utilizador que tem de por id
        }
        let group = args;
        return await groups.updateGroup(group);
    },

    addGameToGroup: async function(args) {
        if (args == null) {
            //dia ao utilizador que tem de por id
        }
        let data = args;
        return await groups.addGameToGroup(data.groupId, data.gameId);
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


    searchGamesByName: async function(name){
        let table = {
            header: ["ID", "Name", "Min Playtime", "Max Playtime"],
            
        };
        return table;
    },

}