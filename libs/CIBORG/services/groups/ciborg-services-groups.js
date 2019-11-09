const HttpCall = require("../../request/HttpCall.js");
//const Props = require("../../shared/Config.js");

let elastProps = {
    host: "http://localhost:9200",
    gameIndex: "games",
    groupIndex: "groups",
    groupGameRel: "group_game_rel",
    ops: {
        search: {
            url: "_search",
            body: { query: { term: {} } }
        },
        delete: {
            url: "_delete_by_query",
            body: { query: { match: { _id: "" } } }
        },
        doc: {
            url: "_doc"
        }
    }
};

let GroupService = {

    getAllGroups: (cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex + "/" + elastProps.ops.search.url;
        let opts = { url: fullUrl, json: true };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            let groupsList = payload.body.hits.hits.map(e => {
                let group = e._source;
                group.id = e._id;
                return group;
            });
            console.log(groupsList);
            cb(null, {
                statusCode: payload.statusCode,
                body: groupsList
            });
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    getGroupById: (groupId, cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.ops.doc.url + "/" + groupId;
        let opts = { url: fullUrl, json: true};
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            let group = payload.body._source;
            group.id = payload.body._id;
            console.log(group);
            cb(null, {
                statusCode: payload.statusCode,
                body: group
            });
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    createGroup: (group, cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex;
        let opts = { url: fullUrl, json: true, body: group };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            console.log(payload.statusCode);
            group.id = payload.body._id;
            console.log(group);
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
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.ops.doc.url + "/" + groupId;
        let opts = { url: fullUrl, json: true, body: group};
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            group.id = payload.body._id;
            console.log(group);
            cb(null, {
                statusCode: payload.statusCode,
                body: group
            });
        };
        HttpCall.put(opts, sucessHanldler, errorHanldler);
    },

    getGamesFromGroup: (groupId, cb) => {
        let handdleGroupById = (error, response) => {
            if(error) {
                cb(error);
            } else {
                let group = response.body;
                cb(null, {
                    statusCode: response.statusCode,
                    body: group.games
                });
                console.log(groupGameRels);
            }
        };
        this.getGroupById(groupId, handdleGroupById);
    },

    addGameToGroup: (group, gameId, cb) => {
        let handleGameByName = (error, response) => {
            if(error) {
                cb(error);
            } else {
                let game = response.body;
                group.games = group.games.push(game);
                this.updateGroup(group,cb);
                console.log(groupGameRels);
            }
        };
        gameServices.getGamesById([gameId], handleGameByName);
    },
    
    removeGameFromGroup: (groupId, gameName, cb) => {
        let handleGameByName = (error, response) => {
            if(error) {
                cb(error);
            } else {
                let game = response.body;
                group.games = group.games.filter(g => g.id !== game.id);
                this.updateGroup(group,cb);
                console.log(groupGameRels);
            }
        };
        gameServices.getGamesById([gameId], handleGameByName);
    }
};

//GroupService.getAllGroups();
//GroupService.getGroupById("A_lAR24BzWeGhLBFL1VJ");
/*GroupService.createGroup({
    "name": "Test Group",
    "description": "Group for testing creation"
});*/
/*
GroupService.updateGroup({
    "id" : "A_lAR24BzWeGhLBFL1VJ",
    "name": "Test Group",
    "description": "Group for testing update"
});*/
//GroupService.getGamesFromGroup("A_lAR24BzWeGhLBFL1VJ");
//GroupService.addGameToGroup("e521406cf84a11e98f0b362b9e155667", "kPDxhJwePW");
//GroupService.addGameToGroup("e521406cf84a11e98f0b362b9e155667", "kPDxhJwePW");

module.export = GroupService;