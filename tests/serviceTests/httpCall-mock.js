let genericMethodCall = (method) => {
    return (options, resolved, rejected) => {
        let game = {games:[{
            id:"kPDxpJZ8PD",
            name:"Spirit Island",
            year_published:2016,
            min_players:1,
            max_players:4,
            min_playtime:90,
            max_playtime:120,
            min_age:13,
            description:"lorem ipsum",
            description_preview:"lorem ipsum",
            price:"53.99",
            primary_publisher:"Greater Than Games",
            num_user_ratings:114,
            average_user_rating:3.956140350877194,
        }]};
        console.log("MOOOOCK");
        resolved(game);
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