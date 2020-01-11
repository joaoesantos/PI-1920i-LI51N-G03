"use strict";

const authentication = require('./model/authentication')
const games = require('./model/games');
const groups = require('./model/groups');
const clientSideConfigs = require('./clientSideConfigs');

module.exports = {

    header: async function() {
        const menuOptions = clientSideConfigs.menuOptions;
        let isLoggedIn = await authentication.isLoggedIn();
        return menuOptions.filter(e => e.login == isLoggedIn);
    },

    home: async function() {
        const img = require('./images/ciborgChess.jpeg').default;
        return img;
    },

    signIn: async function() {
        let isLoggedIn = await authentication.isLoggedIn();
        if (isLoggedIn) {
            throw new Error("Logged in user cannot access login page.");
        }
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

    games: async function(name) {
        let fromServer;
        if (name) {
            fromServer = await games.searchGamesByName(name);
        } else {
            fromServer = await games.getMostPopularGames();
        }
        let gameTable = {
            header: ["ID", "Name", "Min Playtime (mins)", "Max Playtime (mins)"],
            elements: fromServer.payload.map(e => {
                e.min_playtime = e.min_playtime ? e.min_playtime : "-";
                e.max_playtime = e.max_playtime ? e.max_playtime : "-";
                return e;
            })
        }
        return gameTable;
    },

    groups: async function() {
        return await groups.getGroups();
    },

    createGroup: async function(data) {
        return await groups.createGroup(data.name, data.description);
    },

    group: async function(args) {
        if (!args) {
            throw new Error("To access a group the id must be provided.");
        }
        let id = args;
        let group = await groups.getGroup(id);
        console.log()
        group.elements = group.games.map(e => {
            e.min_playtime = e.min_playtime ? e.min_playtime : "-";
            e.max_playtime = e.max_playtime ? e.max_playtime : "-";
            return e;
        });
        delete group.games;
        group.header = ["ID", "Name", "Min Playtime (mins)", "Max Playtime (mins)"]
        return group;
    },

    updateGroup: async function(args) {
        if (!args) {
            console.log("No args on updateGroup");
        } else {
            let group = args;
            return await groups.updateGroup(group);
        }

    },

    addGameToGroup: async function(args) {
        if (!args) {
            console.log("No args on addGameToGroup");
        } else {
            let data = args;
            return await groups.addGameToGroup(data.groupId, data.gameId);
        }
    },

    removeGameFromGroup: async function(args) {
        if (!args) {
            console.log("No args on removeGameFromGroup");
        } else {
            let data = args;
            return await groups.removeGameFromGroup(data.groupId, data.gameId);
        }
    }
}