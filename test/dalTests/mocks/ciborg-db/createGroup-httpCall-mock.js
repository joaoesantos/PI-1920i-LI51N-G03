let genericMethodCall = (method) => {
    return (options, handler) => {
        let groups = {body: {
            "_index": "groups",
            "_type": "groups",
            "_id": "BHCST24B48xg3O5S0PdP",
            "_version": 1,
            "result": "created",
            "_shards": {
                "total": 2,
                "successful": 1,
                "failed": 0
            },
            "_seq_no": 1,
            "_primary_term": 2
        }};
        handler(null, groups);
    };
};

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;