let genericMethodCall = (method) => {
    return async(options) => {
        throw new Error("Error httpcall");
    }
};

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;