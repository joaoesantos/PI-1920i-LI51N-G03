let genericMethodCall = (method) => {
    return async(options) => {
        return new Promise(function(resolve, reject) {
            setTimeout(()=>{
                reject({error: 'err'})
            },1000);
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