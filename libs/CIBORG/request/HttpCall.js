'use strict';

const request = require('request');   
//const CustomError = require

const HttpCall = (options, resolved, rejected) => {
    request.get(options, function(err, resp, body) {
        if (err) {
            rejected(err);
            //rejected(new CustomError("E5001", 500, err.message, "Error acessing DB/API"));
        } else {
            resolved(JSON.parse(body));
        }
    })
};
/*
request.get({url:'http://localhost:9200/pi/_search', json : true, body: {query: {span_term : { id : "rth4eyrt" }}}}, function(err,httpResponse,body){
    console.log(httpResponse.body.hits.hits[0]);
});*/
module.export = HttpCall;