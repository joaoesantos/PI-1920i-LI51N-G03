"use strict";

const authentication = requeire('./model/authentication');
const groups = require('./model/groups');
const games = require('./model/games');

module.exports = {
    home: async function() {
        const img = require('./images/ciborgChess.jpeg').default;
        return img;
    },

    login: async function() {
        console.log('Logging in...');
    },

    logout: async function() {
        return await authentication.logout();
    },

    games: async function() {
        let fromServer = await games.getMostPopularGames();
        return fromServer.payload;
    },

    searchGamesByName: async function(name){
        if(!name){
            name = "";
        }

        let gameList = await games.searchGamesByName(name);
        return gameList.payload;
    },

    getAllUserGroups: async function() {
        return await groups.getAllUserGroups();
    },

    createGroup: async function(data) {
        return await groups.createGroup(data.name, data.description);
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

};