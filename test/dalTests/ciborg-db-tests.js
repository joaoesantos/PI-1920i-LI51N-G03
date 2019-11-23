'use strict';

let assert = require('assert');
let gameService = require('./mocks/ciborg-db/gameServiceMock');

let CiborgError = require('../../libs/CIBORG/errors/ciborg-error');

let props = require('../../libs/CIBORG/shared/Config')("../../libs/CIBORG/shared/files");

let group = require('../../libs/CIBORG/entities/models/Group');

describe('Service-groups tests:', function() {
    it('Should return list with 3 groups', function(done) {
        let groupsdHttpCall = require('./mocks/ciborg-db/getGroups-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, groupsdHttpCall, gameService, CiborgError);
        let resP = groupService.getAllGroups();
        resP.then((res) => {
            assert.equal(3, res.body.length);
            done();
        });

    });

    it('Should return a specific group:', function(done) {
        let groupByIdHttpCall = require('./mocks/ciborg-db/getGroupById-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, groupByIdHttpCall, gameService, CiborgError);
        let resP = groupService.getGroupById("A_lAR24BzWeGhLBFL1VJ");
        resP.then((res) => {
            assert.equal("A_lAR24BzWeGhLBFL1VJ", res.body.id);
            assert.equal("Test Group", res.body.name);
            assert.equal("Group of wild gamers", res.body.description);
            done();
        });
    });

    it('Should return the created group', function(done) {
        let createGroupHttpCall = require('./mocks/ciborg-db/createGroup-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, createGroupHttpCall, gameService, CiborgError);
        let group = {
            id: "BHCST24B48xg3O5S0PdP",
            name: 'Test Group',
            description: "Group of wild gamers",
            games: []
        }
        let resP = groupService.createGroup(group);
        resP.then((res) => {
            assert.equal("BHCST24B48xg3O5S0PdP", res.body.id);
            assert.equal("Test Group", res.body.name);
            assert.equal("Group of wild gamers", res.body.description);
            done();
        });
    });

    it('Should return the updated group', function(done) {
        let updateGroupHttpCall = require('./mocks/ciborg-db/updateGroup-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, updateGroupHttpCall, gameService, CiborgError);
        let group = {
            id: "BXCTT24B48xg3O5SuPev",
            name: 'Test Group',
            description: "Group of wild gamers",
            games: []
        };
        let resP = groupService.updateGroup(group);
        resP.then((res) => {
            assert.equal("BXCTT24B48xg3O5SuPev", res.body.id);
            assert.equal("Test Group", res.body.name);
            assert.equal("Group of wild gamers", res.body.description);
            done();
        });
    });

    it('Should return the list of games from group', function(done) {
        let getGroupByIdHttpCall = require('./mocks/ciborg-db/getGroupById-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, getGroupByIdHttpCall, gameService, CiborgError);
        let group = {
            id: "BXCTT24B48xg3O5SuPev",
            name: 'Test Group',
            description: "Group of wild gamers",
            games: [{
                    id: "fG5Ax8PA7n",
                    name: "Monopoly",
                    min_playtime: 90,
                    max_playtime: 120
                },
                {
                    id: "levMwXaCM6",
                    name: "Monopoly Deal Card Game",
                    min_playtime: 90,
                    max_playtime: 120
                }
            ]
        };
        let resP = groupService.getGamesFromGroup(group);
        resP.then((res) => {
            assert.equal(2, res.body.length);
            assert.equal("fG5Ax8PA7n", res.body[0].id);
            assert.equal("levMwXaCM6", res.body[1].id);
            done();
        });
    });

    it('Should return the group with the added gamed', function(done) {
        let getGroupByIdHttpCall = require('./mocks/ciborg-db/getGroupById-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, getGroupByIdHttpCall, gameService, CiborgError);
        let group = {
            id: "A_lAR24BzWeGhLBFL1VJ",
            name: 'Test Group',
            description: "Group of wild gamers",
            games: [{
                id: "fG5Ax8PA7n",
                name: "Monopoly",
                min_playtime: 90,
                max_playtime: 120
            }]
        };
        let resP = groupService.addGameToGroup(group, "levMwXaCM6");
        resP.then((res) => {
            assert.equal("A_lAR24BzWeGhLBFL1VJ", res.body.id);
            assert.equal(3, res.body.games.length);
            assert.equal("fG5Ax8PA7n", res.body.games[0].id);
            assert.equal("levMwXaCM6", res.body.games[1].id);
            done();
        });
    });

    it('Should return the group with the removed gamed', function(done) {
        let getGroupByIdHttpCall = require('./mocks/ciborg-db/removeGameFromGroup-httpCall-mock');
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, getGroupByIdHttpCall, gameService, CiborgError);
        let group = {
            id: "A_lAR24BzWeGhLBFL1VJ",
            name: 'Test Group',
            description: "Group of wild gamers",
            games: [{
                    id: "fG5Ax8PA7n",
                    name: "Monopoly",
                    min_playtime: 90,
                    max_playtime: 120
                },
                {
                    id: "levMwXaCM6",
                    name: "Monopoly Deal Card Game",
                    min_playtime: 90,
                    max_playtime: 120
                }
            ]
        };
        let resP = groupService.removeGameFromGroup(group.id, "Monopoly Deal Card Game");
        resP.then((res) => {
            assert.deepEqual({}, res.body);
            done();
        });
    });

    it('Should return ciborg error', function(done) {
        let ciborgErrorHttpCall = require('./mocks/ciborg-db/ciborgError-httpCall-mock')(CiborgError);
        let groupService = require('../../libs/CIBORG/dal/ciborg-db')(props, ciborgErrorHttpCall, gameService, CiborgError);
        let resP = groupService.getAllGroups();
        resP.catch((err) => {
            assert.equal('CiborgErrorTest', err.clientErrorMessage);
            done();
        });
    });

});