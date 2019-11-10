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
                        console.log(payload.body)
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
                        console.log("handleGroupById")
                        if(error) {
                            cb(error);
                        } else {
                            let group = response.body;
                            
                            let handleGameByName = (error, response) => {
                                console.log("handleGameByName")
                                if(error) {
                                    cb(error);
                                } else {
                                    let games = response.body;
                                    let wasGameAdded = false;
                                    console.log(games)
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
                            console.log("after search")
                        }
                    } catch(err) {
                        console.log(err)
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
        
        removeGameFromGroup: function (group, gameId, cb) {
            try {
                let handleGameByName = (error, response) => {
                    if(error) {
                        cb(error);
                    } else {
                        let game = response.body;
                        group.games = group.games.filter(g => g.id !== game.id);
                        let groupId = group.id;
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
                };
                GameServices.getGamesById([gameId], handleGameByName);
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