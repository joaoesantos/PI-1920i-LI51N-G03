'use strict';

let request = require('request');
//const CustomError = require

let genericMethodCall = (method) => {
    return (options, resolved, rejected) => {
        request[method.toLowerCase()](options, function(err, resp) {
            if (err) { //verificar como detar erro, status code apenas?
                rejected(resp);
                //rejected(new CustomError("E5001", 500, err.message, "Error acessing DB/API"));
            } else {
                resolved(resp);
            }
        })
    };
}

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

/*
request.get({url:'http://localhost:9200/pi/_search', json : true, body: {query: {span_term : { id : "rth4eyrt" }}}}, function(err,httpResponse,body){
    console.log(httpResponse.body.hits.hits[0]);
});*/
/*
console.log(HttpCall.get({ url: 'http://localhost:9200/games/_search' }, function(resp, cenas) {
        console.log("------------------------------------------------");
        console.log(resp);
        console.log("/////////////////////////////////////////////////");
        console.log(cenas);
    },
    function(resp) {

    }
));*/

module.exports = HttpCall;