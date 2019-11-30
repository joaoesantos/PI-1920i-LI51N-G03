'use strict';
let debug = require('debug')('ciborg-db');
debug.enabled = true;

let GroupService = (Props, HttpCall, GameServices, CiborgError) => {

    // enables or disables debug according to configuration file
    if (!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }

    let GroupServiceObject = {
        getAllGroups: async() => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.search.url;
                let opts = { url: fullUrl, json: true };
                let payload = await HttpCall.get(opts);
                debug.extend('getAllGroups').extend('handler')('Handling HTTP GET');
                let groupsList = payload.body.hits.hits.map(e => {
                    let group = e._source;
                    group.id = e._id;
                    return group;
                });
                return {
                    statusCode: payload.statusCode,
                    body: groupsList
                };
            } catch (err) {
                debug.extend('getAllGroups')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: getAllGroups.',
                        'Unable to get groups.',
                        '500' // Internal Server Error
                    );
                }

            }
        },

        getGroupById: async(groupId) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                let opts = { url: fullUrl, json: true };
                let payload = await HttpCall.get(opts);

                if (payload.body.found) {
                    let group = payload.body._source;
                    group.id = payload.body._id;
                    return {
                        statusCode: payload.statusCode,
                        body: group
                    };
                } else {
                    throw new CiborgError(
                        'Error in service: groupt with id ' + groupId + ' not found.',
                        'Unable to get group.',
                        '404' // Internal Server Error
                    );
                }
            } catch (err) {
                debug.extend('getGroupById')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: getGroupById.',
                        'Unable to get group.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        createGroup: async(group) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex;
                //add empty game array
                group.games = [];
                let opts = { url: fullUrl, json: true, body: group };
                let payload = await HttpCall.post(opts);
                debug.extend('createGroup').extend('handler')('Handling HTTP POST');
                group.id = payload.body._id;
                return {
                    statusCode: payload.statusCode,
                    body: group
                };
            } catch (err) {
                debug.extend('createGroup')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: createGroup.',
                        'Unable to create group.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        updateGroup: async(group) => {
            try {
                let groupId = group.id;
                delete group.id;
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                let opts = { url: fullUrl, json: true, body: group };
                let payload = await HttpCall.put(opts);
                debug.extend('updateGroup').extend('handler')('Handling HTTP PUT');
                group.id = payload.body._id;
                return {
                    statusCode: payload.statusCode,
                    body: group
                };
            } catch (err) {
                debug.extend('updateGroup')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: updateGroup.',
                        'Unable to update group.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        getGamesFromGroup: async function(groupId) {
            try {
                let payload = await this.getGroupById(groupId);
                debug.extend('getGamesFromGroup').extend('handdleGroupById')('Handling getGroupById: ' + groupId);
                let group = payload.body;
                return {
                    statusCode: payload.statusCode,
                    body: group.games
                };
            } catch (err) {
                debug.extend('getGamesFromGroup')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: getGamesFromGroup.',
                        'Unable to get games from group.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        addGameToGroup: async function(groupId, gameId) {
            try {
                let promisses = await Promise.all([this.getGroupById(groupId), GameServices.getGameByID(gameId)]);
                let payload = promisses[0];
                debug.extend('addGameToGroup').extend('handleGroupById')('Handling getGroupById: ' + groupId);

                let group = payload.body;

                let gamePayload = promisses[1];

                debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')('Handling searchByName: ' + gameId);
                let games = gamePayload.body;
                let wasGameAdded = false;
                games.forEach(el => {
                    if (!group.games.find(game => game.name === el.name)) {
                        group.games.push(el);
                        wasGameAdded = true;
                    }
                });
                if (!wasGameAdded) {
                    debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')('Error in service: addGameToGroup. The game does not exist or was already added.');
                    throw new CiborgError(
                        'Error in service: addGameToGroup. The game does not exist or was already added.',
                        'Unable to add game to group. Either the game does not exist or was already added.',
                        '500' // Internal Server Error
                    );
                } else {
                    let resultPayload = await this.updateGroup(group);
                    return resultPayload;
                }
            } catch (err) {
                debug.extend('addGameToGroup')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: addGameToGroup.',
                        'Unable to get add game to group.',
                        '500' // Internal Server Error
                    );
                }
            }
        },

        removeGameFromGroup: async function(groupId, gameId) {
            try {
                let promisses = await Promise.all([this.getGroupById(groupId), GameServices.getGameByID(gameId)]);
                let payload = promisses[0];
                debug.extend('removeGameFromGroup').extend('handleGroupById')('Handling getGroupById: ' + groupId);
                let group = payload.body;

                let gamePayload = promisses[1];

                debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')('Handling searchByName: ' + gameId);
                let games = gamePayload.body;
                let wereGamesRemoved = false;
                games.forEach(el => {
                    group.games = group.games.filter(game => {
                        let isFiltered = game.name === el.name;
                        if (isFiltered) {
                            wereGamesRemoved = true;
                        }
                        return isFiltered;
                    });
                });
                if (!wereGamesRemoved) {
                    debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')('Error in service: removeGameFromGroup. The game does not exist or is not in this group.');
                    throw new CiborgError(
                        'Error in service: removeGameFromGroup. The game does not exist or is not in this group.',
                        'Unable to remove game from group. Either the game does not exist or is is not related to this group.',
                        '500' // Internal Server Error
                    );
                } else {
                    delete group.id;
                    let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                    let opts = { url: fullUrl, json: true, body: group };

                    let resultPayload = await HttpCall.put(opts);

                    debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName').extend('handler')('Handling HTTP PUT');
                    return {
                        statusCode: 202,
                        body: {}
                    };

                }
            } catch (err) {
                debug.extend('removeGameFromGroup')(err);
                if (err instanceof CiborgError) {
                    throw err;
                } else {
                    throw new CiborgError(
                        'Error in service: removeGameFromGroup.',
                        'Unable to get remove game from group.',
                        '500' // Internal Server Error
                    );
                }
            }
        }
    };
    return GroupServiceObject;
};

module.exports = GroupService;