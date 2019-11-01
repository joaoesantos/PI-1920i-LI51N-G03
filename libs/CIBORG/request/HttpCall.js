'use strict';

let request = require('request');
//const CustomError = require

const HttpCall = {
    get: genricMethodCall("GET"),
    post: genricMethodCall("POST"),
    put: genricMethodCall("PUT"),
    delete: genricMethodCall("DELETE")
}

let genricMethodCall = (method) => {
    return (options, resolved, rejected) => {
        request[method.toUpperCase()](options, function(err, resp, body) {
            if (err) {
                rejected(err);
                //rejected(new CustomError("E5001", 500, err.message, "Error acessing DB/API"));
            } else {
                resolved(JSON.parse(body));
            }
        })
    };
}

/*
request.get({url:'http://localhost:9200/pi/_search', json : true, body: {query: {span_term : { id : "rth4eyrt" }}}}, function(err,httpResponse,body){
    console.log(httpResponse.body.hits.hits[0]);
});*/
module.export = HttpCall;