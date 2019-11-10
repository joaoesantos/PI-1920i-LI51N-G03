let GroupService = (Props, HttpCall, GameServices, CiborgError) => {
    let GroupServiceObject = {
    
        getAllGroups: (cb) => {
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
        },
    
        getGroupById: (groupId, cb) => {
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
        },
    
        createGroup: (group, cb) => {
            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex;
            let opts = { url: fullUrl, json: true, body: group };
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
            HttpCall.post(opts, handler);
        },
    
        updateGroup: (group, cb) => {
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
        },
    
        getGamesFromGroup: function(groupId, cb) {
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
        },
    
        addGameToGroup: function (group, gameId, cb) {
            let handleGameByName = (error, response) => {
                if(error) {
                    cb(error);
                } else {
                    let game = response.body;
                    group.games.push(game);
                    this.updateGroup(group,cb);
                }
            };
            GameServices.getGamesById([gameId], handleGameByName);
        },
        
        removeGameFromGroup: function (group, gameId, cb) {
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
        }
    };
    return GroupServiceObject;
};

module.exports = GroupService;