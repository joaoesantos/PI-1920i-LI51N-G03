'use strict';
var debug = require('debug')('ciborg-db');

let GroupService = (Props, HttpCall, GameServices, CiborgError) => {
    if(!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }
    let GroupServiceObject = {
            getAllGroups: (cb) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.search.url;
                let opts = { url: fullUrl, json: true };
                let handler = (err, payload) => {
                    debug.extend('getAllGroups').extend('handler')("Handling HTTP GET");
                    try {
                        if(err) {
                            debug.extend('getAllGroups').extend('handler')(err);
                            cb(err);
                        } else {
                            let groupsList = payload.body.hits.hits.map(e => {
                                let group = e._source;
                                group.id = e._id;
                                return group;
                            });
                            cb(null, {
                                statusCode: payload.statusCode,
                                body: groupsList
                            });
                        }
                    } catch(err) {
                        debug.extend('getAllGroups').extend('handler')(err);
                        cb(new CiborgError(
                            'Error in service: getAllGroups.',
                            'Unable to get groups.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                HttpCall.get(opts, handler);
            } catch(err) {
                debug.extend('getAllGroups')(err);
                cb( new CiborgError(
                    'Error in service: getAllGroups.',
                    'Unable to get groups.',
                    '500' // Internal Server Error
                ));
            }
        },
    
        getGroupById: (groupId, cb) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                let opts = { url: fullUrl, json: true};
                let handler = (err, payload) => {
                    debug.extend('getGroupById').extend('handler')("Handling HTTP GET");
                    try {
                        if(err) {
                            debug.extend('getGroupById').extend('handler')(err);
                            cb(err);
                        } else {
                            let group = payload.body._source;
                            group.id = payload.body._id;
                            cb(null, {
                                statusCode: payload.statusCode,
                                body: group
                            });
                        }
                    } catch(err) {
                        debug.extend('getGroupById').extend('handler')(err);
                        cb( new CiborgError(
                            'Error in service: getGroupById.',
                            'Unable to get group.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                HttpCall.get(opts, handler);
            } catch(err) {
                debug.extend('getGroupById')(err);
                cb( new CiborgError(
                    'Error in service: getGroupById.',
                    'Unable to get group.',
                    '500' // Internal Server Error
                ));
            }
        },
    
        createGroup: (group, cb) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex;
                //add empty game array
                group.games = [];
                let opts = { url: fullUrl, json: true, body: group };
                let handler = (err, payload) => {
                    debug.extend('createGroup').extend('handler')("Handling HTTP POST");
                    try {
                        if(err) {
                            debug.extend('createGroup').extend('handler')(err);
                            cb(err);
                        } else {
                            group.id = payload.body._id;
                            cb(null, {
                                statusCode: payload.statusCode,
                                body: group
                            });
                        }
                    } catch(err) {
                        debug.extend('createGroup').extend('handler')(err);
                        cb( new CiborgError(
                            'Error in service: createGroup.',
                            'Unable to create group.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                HttpCall.post(opts, handler);
            } catch(err) {
                debug.extend('createGroup')(err);
                cb( new CiborgError(
                    'Error in service: createGroup.',
                    'Unable to create group.',
                    '500' // Internal Server Error
                ));
            }
        },
    
        updateGroup: (group, cb) => {
            try {
                let groupId = group.id;
                delete group.id;
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                let opts = { url: fullUrl, json: true, body: group};
                let handler = (err, payload) => {
                    debug.extend('updateGroup').extend('handler')("Handling HTTP PUT");
                    try {
                        if(err) {
                            debug.extend('updateGroup').extend('handler')(err);
                            cb(err);
                        } else {
                            group.id = payload.body._id;
                            cb(null, {
                                statusCode: payload.statusCode,
                                body: group
                            });
                        }
                    } catch(err) {
                        debug.extend('updateGroup').extend('handler')(err);
                        cb( new CiborgError(
                            'Error in service: updateGroup.',
                            'Unable to update group.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                HttpCall.put(opts, handler);
            } catch(err) {
                debug.extend('updateGroup')(err);
                cb( new CiborgError(
                    'Error in service: updateGroup.',
                    'Unable to update group.',
                    '500' // Internal Server Error
                ));
            }
        },

        /**
         * Updating a group object considering the argument object does not contain a games array, as such this array must first be retrieved from the db.
         */
        updateGroupWithNoGames: (group, cb) => {
            try {
                let handleGroupById = (error, response) => {
                    debug.extend('updateGroupWithNoGames').extend('handleGroupById')("Handling getGroupById: " + groupId);
                    try {
                        if(error) {
                            debug.extend('updateGroupWithNoGames').extend('handleGroupById')(error);
                            cb(error);
                        } else {
                            let groupWithGames = response.body;
                            group.games = groupWithGames.games;
                            delete group.id;
                            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                            let opts = { url: fullUrl, json: true, body: group};
                            let handler = (err, payload) => {
                                debug.extend('updateGroupWithNoGames').extend('handleGroupById').extend('handler')("Handling HTTP PUT");
                                try {
                                    if(err) {
                                        debug.extend('updateGroupWithNoGames').extend('handleGroupById').extend('handler')(err);
                                        cb(err);
                                    } else {
                                        group.id = payload.body._id;
                                        cb(null, {
                                            statusCode: payload.statusCode,
                                            body: group
                                        });
                                    }
                                } catch(err) {
                                    debug.extend('updateGroupWithNoGames').extend('handleGroupById').extend('handler')(err);
                                    cb( new CiborgError(
                                        'Error in service: updateGroup.',
                                        'Unable to update group.',
                                        '500' // Internal Server Error
                                    ));
                                }
                            };
                            HttpCall.put(opts, handler);
                        }
                    } catch(err) {
                        debug.extend('updateGroupWithNoGames').extend('handleGroupById')(err);
                        cb( new CiborgError(
                            'Error in service: addGameToGroup.',
                            'Unable to get group for adding the game.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                this.getGroupById(groupId, handleGroupById);
            } catch(err) {
                debug.extend('updateGroupWithNoGames')(err);
                cb( new CiborgError(
                    'Error in service: updateGroup.',
                    'Unable to update group.',
                    '500' // Internal Server Error
                ));
            }
        },
    
        getGamesFromGroup: function(groupId, cb) {
            try {
                let handdleGroupById = (error, response) => {
                    debug.extend('getGamesFromGroup').extend('handdleGroupById')("Handling getGroupById: " + groupId);
                    try {
                        if(error) {
                            debug.extend('getGamesFromGroup').extend('handdleGroupById')(error);
                            cb(error);
                        } else {
                            let group = response.body;
                            cb(null, {
                                statusCode: response.statusCode,
                                body: group.games
                            });
                        }
                    } catch(err) {
                        debug.extend('getGamesFromGroup').extend('handdleGroupById')(err);
                        cb( new CiborgError(
                            'Error in service: getGamesFromGroup.',
                            'Unable to get games from group.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                this.getGroupById(groupId, handdleGroupById);
            } catch(err) {
                debug.extend('getGamesFromGroup')(err);
                cb( new CiborgError(
                    'Error in service: getGamesFromGroup.',
                    'Unable to get games from group.',
                    '500' // Internal Server Error
                ));
            }
        },
    
        addGameToGroup: function (groupId, gameName, cb) {
            try {
                let handleGroupById = (error, response) => {
                    debug.extend('addGameToGroup').extend('handleGroupById')("Handling getGroupById: " + groupId);
                    try {
                        if(error) {
                            debug.extend('addGameToGroup').extend('handleGroupById')(error);
                            cb(error);
                        } else {
                            let group = response.body;
    
                            let handleGameByName = (error, response) => {
                                debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')("Handling searchByName: " + gameName);
                                try {
                                    if(error) {
                                        debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')(error);
                                        cb(error);
                                    } else {
                                        let games = response.body;
                                        let wasGameAdded = false;
                                        games.forEach(el => {
                                            if(!group.games.find(game => game.name === el.name)) {
                                                group.games.push(el);
                                                wasGameAdded = true;
                                            }
                                        });
                                        if(!wasGameAdded){
                                            debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')('Error in service: addGameToGroup. The game does not exist or was already added.');
                                            cb( new CiborgError(
                                                'Error in service: addGameToGroup. The game does not exist or was already added.',
                                                'Unable to add game to group. Either the game does not exist or was already added.',
                                                '500' // Internal Server Error
                                            ));
                                        } else {
                                            this.updateGroup(group,cb);
                                        }
                                    }
                                } catch(err) {
                                    debug.extend('addGameToGroup').extend('handleGroupById').extend('handleGameByName')(err);
                                    cb( new CiborgError(
                                        'Error in service: addGameToGroup.',
                                        'Unable to get group for adding the game.',
                                        '500' // Internal Server Error
                                    ));
                                }
                            };
                            GameServices.searchByName(gameName, handleGameByName);
                        }
                    } catch(err) {
                        debug.extend('addGameToGroup').extend('handleGroupById')(err);
                        cb( new CiborgError(
                            'Error in service: addGameToGroup.',
                            'Unable to get group for adding the game.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                this.getGroupById(groupId, handleGroupById);
            } catch(err) {
                debug.extend('addGameToGroup')(err);
                cb( new CiborgError(
                    'Error in service: addGameToGroup.',
                    'Unable to get add game to group.',
                    '500' // Internal Server Error
                ));
            }
        },
        
        removeGameFromGroup: function (groupId, gameName, cb) {
            try {
                let handleGroupById = (error, response) => {
                    debug.extend('removeGameFromGroup').extend('handleGroupById')("Handling getGroupById: " + groupId);
                    try {
                        if(error) {
                            debug.extend('removeGameFromGroup').extend('handleGroupById')(error);
                            cb(error);
                        } else {
                            let group = response.body;
                            let handleGameByName = (error, response) => {
                                try {
                                    debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')("Handling searchByName: " + gameName);
                                    if(error) {
                                        debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')(error);
                                        cb(error);
                                    } else {
                                        let games = response.body;
                                        let wereGamesRemoved = false;
                                        games.forEach(el => {
                                            group.games = group.games.filter(game => {
                                                let isFiltered = game.name === el.name;
                                                if(isFiltered) {
                                                    wereGamesRemoved = true;
                                                }
                                                return isFiltered;
                                            });
                                        });
                                        if(!wereGamesRemoved) {
                                            debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')('Error in service: removeGameFromGroup. The game does not exist or is not in this group.');
                                            cb( new CiborgError(
                                                'Error in service: removeGameFromGroup. The game does not exist or is not in this group.',
                                                'Unable to remove game from group. Either the game does not exist or is is not related to this group.',
                                                '500' // Internal Server Error
                                            ));
                                        } else {
                                            delete group.id;
                                            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
                                            let opts = { url: fullUrl, json: true, body: group};
                                            let handler = (err, payload) => {
                                                debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName').extend('handler')("Handling HTTP PUT");
                                                try {
                                                    if(err) {
                                                        debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName').extend('handler')(err);
                                                        cb(err);
                                                    } else {
                                                        cb(null, {
                                                            statusCode: 202,
                                                            body: {}
                                                        });
                                                    }
                                                } catch(err) {
                                                    debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName').extend('handler')(err);
                                                    cb( new CiborgError(
                                                        'Error in service: addGameToGroup.',
                                                        'Unable to get group for adding the game.',
                                                        '500' // Internal Server Error
                                                    ));
                                                }
                                            }; 
                                            HttpCall.put(opts, handler); 
                                        }                                    
                                    }
                                } catch(err) {
                                    debug.extend('removeGameFromGroup').extend('handleGroupById').extend('handleGameByName')(err);
                                    cb( new CiborgError(
                                        'Error in service: addGameToGroup.',
                                        'Unable to get group for adding the game.',
                                        '500' // Internal Server Error
                                    ));
                                }
                            };
                            GameServices.searchByName(gameName, handleGameByName);
                        }
                    } catch(err) {
                        debug.extend('removeGameFromGroup').extend('handleGroupById')(err);
                        cb( new CiborgError(
                            'Error in service: removeGameFromGroup.',
                            'Unable to get group to remove from game.',
                            '500' // Internal Server Error
                        ));
                    }
                }
                this.getGroupById(groupId, handleGroupById);
            } catch(err) {
                debug.extend('removeGameFromGroup')(err);
                cb( new CiborgError(
                    'Error in service: removeGameFromGroup.',
                    'Unable to get remove game from group.',
                    '500' // Internal Server Error
                ));
            }
        } 
    };
    return GroupServiceObject;
};

module.exports = GroupService;