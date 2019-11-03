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
            console.log(payload.body.hits.hits.map(e => e._source));
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    getGroupById: (groupId) => {
        let fullUrl = elastProps.host + "/" + elastProps.groupIndex + "/" + elastProps.groupIndex + "/" + elastProps.ops.search.url;
        let body = elastProps.ops.search.body;
        body.query.term = { "id": groupId };
        //console.log(body)
        let opts = { url: fullUrl, json: true, body: body };
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            console.log(payload.body.hits.hits.map(e => e._source)[0]);
        };
        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    createGroup: (group) => {

    },

    updateGroup: (group) => {

    },

    getGamesFromGroup: (groupId) => {

    },

    addGameToGroup: (groupId, gameName) => {

    },

    removeGameFromGroup: (groupId, gameName) => {

    }

};

//GroupService.getAllGroups();
GroupService.getGroupById("e521406cf84a11e98f0b362b9e155667");

module.export = GroupService;