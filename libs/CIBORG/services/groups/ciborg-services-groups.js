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
        }
    }
};

let GroupService = {

    getAllGroups: (cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex + "/" + elastProps.ops.search.url;
        let opts = { url: fullUrl, json: true };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            let groupsList = payload.body.hits.hits.map(e => e._source);
            console.log(groupsList);
            cb(null, groupsList);
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    getGroupById: (groupId, cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex + "/" + elastProps.ops.search.url;
        let body = elastProps.ops.search.body;
        body.query.term = { "id": groupId };
        //console.log(body)
        let opts = { url: fullUrl, json: true, body: body };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            let group = payload.body.hits.hits.map(e => e._source)[0];
            console.log(group);
            cb(null, group);
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    createGroup: (group) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex;
        let opts = { url: fullUrl, json: true, body: group };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            console.log(payload.statusCode);
            cb(null, group);
        };
        HttpCall.post(opts, sucessHanldler, errorHanldler);
    },

    updateGroup: (group) => {

    },

    getGamesFromGroup: (groupId) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupGameRel + "/" + elastProps.groupGameRel + "/" + elastProps.ops.search.url;
        let body = elastProps.ops.search.body;
        body.query.term = { "groupId": groupId };
        //console.log(body)
        let opts = { url: fullUrl, json: true, body: body };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            let groupGameRels = payload.body.hits.hits.map(e => e._source);
            console.log(groupGameRels);
            //cb(null, group);
            //chamar service dos jogos para cada um
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    addGameToGroup: (groupId, gameId) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupGameRel + "/" + elastProps.groupGameRel;
        let body = {
            "groupId": groupId,
            "gameId": gameId
        };
        let opts = { url: fullUrl, json: true, body: body };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            console.log(payload.statusCode);
            //cb(null, group);
        };
        HttpCall.post(opts, sucessHanldler, errorHanldler);
    },

    removeGameFromGroup: (groupId, gameName) => {

    }

};

//GroupService.getAllGroups();
//GroupService.getGroupById("e521406cf84a11e98f0b362b9e155667");
/*GroupService.createGroup({
    "id": "e333406cf84a11e98555552b9e155667",
    "name": "Test Group",
    "description": "Group for testing creation"
});*/
//GroupService.getGamesFromGroup("e521406cf84a11e98f0b362b9e155667");
//
GroupService.addGameToGroup("e521406cf84a11e98f0b362b9e155667", "kPDxhJwePW");


module.export = GroupService;