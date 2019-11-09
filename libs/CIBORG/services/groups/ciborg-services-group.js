let GroupService = (Props, HttpCall, GameServices, CiborgError) => {
    let GroupServiceObject = {
    
        getAllGroups: (cb) => {
            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.search.url;
            let opts = { url: fullUrl, json: true };
            let errorHanldler = (err) => { cb(err) };
            let sucessHanldler = (payload) => {
                let groupsList = payload.body.hits.hits.map(e => {
                    let group = e._source;
                    group.id = e._id;
                    return group;
                });
                cb(null, {
                    statusCode: payload.statusCode,
                    body: groupsList
                });
            };
            HttpCall.get(opts, sucessHanldler, errorHanldler);
        },
    
        getGroupById: (groupId, cb) => {
            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
            let opts = { url: fullUrl, json: true};
            let errorHanldler = (err) => { cb(err) };
            let sucessHanldler = (payload) => {
                let group = payload.body._source;
                group.id = payload.body._id;
                cb(null, {
                    statusCode: payload.statusCode,
                    body: group
                });
            };
            HttpCall.get(opts, sucessHanldler, errorHanldler);
        },
    
        createGroup: (group, cb) => {
            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.groupIndex;
            let opts = { url: fullUrl, json: true, body: group };
            let errorHanldler = (err) => { cb(err) };
            let sucessHanldler = (payload) => {
                group.id = payload.body._id;
                cb(null, {
                    statusCode: payload.statusCode,
                    body: group
                });
            };
            HttpCall.post(opts, sucessHanldler, errorHanldler);
        },
    
        updateGroup: (group, cb) => {
            let groupId = group.id;
            delete group.id;
            let fullUrl = Props.elastProps.host + "/" + Props.elastProps.groupIndex + "/" + Props.elastProps.ops.doc.url + "/" + groupId;
            let opts = { url: fullUrl, json: true, body: group};
            let errorHanldler = (err) => { cb(err) };
            let sucessHanldler = (payload) => {
                group.id = payload.body._id;
                cb(null, {
                    statusCode: payload.statusCode,
                    body: group
                });
            };
            HttpCall.put(opts, sucessHanldler, errorHanldler);
        },
    
        getGamesFromGroup: function (groupId, cb) {
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
                    this.updateGroup(group,cb);
                }
            };
            GameServices.getGamesById([gameId], handleGameByName);
        }
    };
    return GroupServiceObject;
};

module.exports = GroupService;