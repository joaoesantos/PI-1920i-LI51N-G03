'use strict';

let GroupService = (Props, HttpCall, GameServices, CiborgError) => {
    let GroupServiceObject = {

            getAllGroups: (cb) => {
            try {
                let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.search.url;
                let opts = { url: fullUrl, json: true };
                let handler = (err, payload) => {
                    if(err) {
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
                };
                HttpCall.get(opts, handler);
            } catch(err) {
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
                    if(err) {
                        cb(err);
                    } else {
                        let group = payload.body._source;
                        group.id = payload.body._id;
                        cb(null, {
                            statusCode: payload.statusCode,
                            body: group
                        });
                    }
                };
                HttpCall.get(opts, handler);
            } catch(err) {
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
                let opts = { url: fullUrl, json: true, body: group };
                let handler = (err, payload) => {
                    if(err) {
                        cb(err);
                    } else {
                        console.log(group);
                        group.id = payload.body._id;
                        cb(null, {
                            statusCode: payload.statusCode,
                            body: group
                        });
                    }
                };
                HttpCall.post(opts, handler);
            } catch(err) {
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
                    if(err) {
                        cb(err);
                    } else {
                        group.id = payload.body._id;
                        cb(null, {
                            statusCode: payload.statusCode,
                            body: group
                        });
                    }
                };
                HttpCall.put(opts, handler);
            } catch(err) {
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
                    if(error) {
                        cb(error);
                    } else {
                        let group = response.body;
                        cb(null, {
                            statusCode: response.statusCode,
                            body: group.games
                        });
                    }
                };
                this.getGroupById(groupId, handdleGroupById);
            } catch(err) {
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
                    try {
                        if(error) {
                            cb(error);
                        } else {
                            let group = response.body;
                            
                            let handleGameByName = (error, response) => {
                                if(error) {
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
                                        cb( new CiborgError(
                                            'Error in service: addGameToGroup. The game does not exist or was already added.',
                                            'Unable to add game to group. Either the game does not exist or was already added.',
                                            '500' // Internal Server Error
                                        ));
                                    } else {
                                        this.updateGroup(group,cb);
                                    }
                                }
                            };
                            GameServices.searchByName(gameName, handleGameByName);
                        }
                    } catch(err) {
                        cb( new CiborgError(
                            'Error in service: addGameToGroup.',
                            'Unable to get group for adding the game.',
                            '500' // Internal Server Error
                        ));
                    }
                };
                this.getGroupById(groupId, handleGroupById);
            } catch(err) {
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
                    try {
                        if(error) {
                            cb(error);
                        } else {
                            let group = response.body;
                            let handleGameByName = (error, response) => {
                                if(error) {
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
                                            if(err) {
                                                cb(err);
                                            } else {
                                                cb(null, {
                                                    statusCode: 202,
                                                    body: {}
                                                });
                                            }
                                        }; 
                                        HttpCall.put(opts, handler); 
                                    }                                    
                                }
                            };
                            GameServices.searchByName(gameName, handleGameByName);
                        }
                    } catch(err) {
                        cb( new CiborgError(
                            'Error in service: removeGameFromGroup.',
                            'Unable to get group to remove from game.',
                            '500' // Internal Server Error
                        ));
                    }
                }
                this.getGroupById(groupId, handleGroupById);
            } catch(err) {
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