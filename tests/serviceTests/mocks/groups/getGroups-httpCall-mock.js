let genericMethodCall = (method) => {
    return (options, resolved, rejected) => {
        let groups = {body: {
            took: 16,
            timed_out: false,
            _shards: {
              total: 1,
              successful: 1,
              skipped: 0,
              failed: 0
            },
            hits: {
              total: {
                value: 3,
                relation: 'eq'
              },
              max_score: 1,
              hits: [
                {
                  _index: 'groups',
                  _type: 'groups',
                  _id: 'BHCST24B48xg3O5S0PdP',
                  _score: 1,
                  _source: {
                    name: 'Test Group',
                    description: 'Group of wild gamers 3',
                    games: []
                  }
                },
                {
                  _index: 'groups',
                  _type: 'groups',
                  _id: 'BXCTT24B48xg3O5SuPev',
                  _score: 1,
                  _source: {
                    name: 'Test Group',
                    description: 'Group for testing creation 4 44 4 4 44 44',
                    games: []
                  }
                },
                {
                  _index: 'groups',
                  _type: 'groups',
                  _id: 'A_lAR24BzWeGhLBFL1VJ',
                  _score: 1,
                  _source: {
                    name: 'Test Group',
                    description: 'Group for testing creation',
                    games: []
                  }
                }
              ]
            }
          }};
        resolved(groups);
    };
};

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;