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

console.log(HttpCall)

let GroupService = {

    getAllGroups: (cb) => {
        let fullUrl = elastProps.host + "/" + elastProps.gameIndex + "/" + elastProps.gameIndex + "/" + elastProps.ops.search.url;
        let opts = {
            url: fullUrl
        }
        let errorHanldler = (err) => { cb(err) };
        let sucessHanldler = (payload) => {
            console.log(payloa);
        };

        console.log(HttpCall)

        HttpCall.get(opts, sucessHanldler, errorHanldler);
    },

    getGroupById: (groupId) => {

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

GroupService.getAllGroups();

module.export = GroupService;