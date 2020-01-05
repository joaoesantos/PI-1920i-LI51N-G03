"use strict";

const groups = require('./model/groups');

module.exports = {
    home: async function() {
        const img = require('./images/istockphoto.jpg').default;
        return img;
    },

    // groups models
    getAllUserGroups: async function () {
        return groups.getAllUserGroups();
    },

    createGroup: async function () {
        return groups.createGroup();
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