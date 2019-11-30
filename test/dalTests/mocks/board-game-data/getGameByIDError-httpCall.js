let httpCall = (CiborgError) => {
    let genericMethodCall = (method) => {
        return async(options) => {
            let err = new CiborgError(null,'Error httpcall','Error httpcall','500');
            throw err;
        }
    };
    
    let HttpCall =  {
        get: genericMethodCall("GET"),
        post: genericMethodCall("POST"),
        put: genericMethodCall("PUT"),
        delete: genericMethodCall("DELETE")
    }

    return HttpCall;
}

module.exports = httpCall;