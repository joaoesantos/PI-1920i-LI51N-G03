let genericMethodCall = (method) => {
    return async(options) => {
        let group = {
            body: {
                "_index": "groups",
                "_type": "_doc",
                "_id": "BXCTT24B48xg3O5SuPev",
                "_version": 2,
                "result": "updated",
                "_shards": {
                    "total": 2,
                    "successful": 1,
                    "failed": 0
                },
                "_seq_no": 3,
                "_primary_term": 2
            }
        };
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