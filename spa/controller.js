"use strict";

const authentication = require('./model/authentication')
const groups = require('./model/groups');
const games = require('./model/games');
const clientSideConfigs = require('./clientSideConfigs');

module.exports = {
    home: async function() {
        const img = require('./images/ciborgChess.jpeg').default;
        return img;
    },

    login: async function() {
        let isLoggedIn = await authentication.isLoggedIn();
        if (isLoggedIn) {
            throw new Error("Logged in user cannot access login page.");
        }
    },

    logout: async function() {
        return await authentication.logout();
    },

    games: async function() {
        let fromServer = await games.getMostPopularGames();
        return fromServer.payload;
    },

    searchGamesByName: async function(name) {
        let table = {
            header: ["ID", "Name", "Min Playtime", "Max Playtime"]
        };
        return table;
    },

    groups: async function() {
        return await groups.getGroups();
    },

    createGroup: async function(data) {
        return await groups.createGroup(data.name, data.description);
    },

    group: async function(args) {
        if (args == null) {
            throw new Error("To access a group the id must be provided.");
        }
        let id = args;
        return await groups.getGroup(id);
    },

    updateGroup: async function(args) {
        if (args == undefined) {
            console.log("No args on updateGroup");
        } else {
            let group = args;
            return await groups.updateGroup(group);
        }

    },

    addGameToGroup: async function(args) {
        if (args == undefined) {
            console.log("No args on addGameToGroup");
        } else {
            let data = args;
            return await groups.addGameToGroup(data.groupId, data.gameId);
        }
    },

    removeGameFromGroup: async function(args) {
        if (args == null) {
            console.log("No args on removeGameFromGroup");
        } else {
            let data = args;
            return await groups.removeGameFromGroup(data.groupId, data.gameId);
        }
    },

    header: async function() {
        const menuOptions = clientSideConfigs.menuOptions;
        let isLoggedIn = await authentication.isLoggedIn();
        return menuOptions.filter(e => e.login == isLoggedIn);
    }
}