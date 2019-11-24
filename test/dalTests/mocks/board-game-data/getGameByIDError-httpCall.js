let genericMethodCall = (method) => {
    return async(options) => {
        return new Promise(function(resolve, reject) {
            reject({error: 'err'})
        });
    }
};

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;