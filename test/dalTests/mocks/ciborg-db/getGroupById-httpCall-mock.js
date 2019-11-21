'use strict';

let genericMethodCall = (method) => {
    return async (options, handler) => {
        let group = {body: {
          _index : "groups",
          _type : "_doc",
          _id : "A_lAR24BzWeGhLBFL1VJ",
          _version : 1,
          _seq_no : 0,
          _primary_term : 1,
          found : true,
          _source : {
            name : 'Test Group',
            description : "Group of wild gamers",
            games : [{
              id:"fG5Ax8PA7n",
              name:"Monopoly",
              min_playtime:90,
              max_playtime:120
          },
          {
              id:"levMwXaCM6",
              name:"Monopoly NOT Deal Card Game",
              min_playtime:90,
              max_playtime:120
          }]
          }
        }};
        return Promise.resolve(group);
    };
};

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;