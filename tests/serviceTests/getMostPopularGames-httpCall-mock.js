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
        },
        {
            id:"i5Oqu5VZgP",
            name:"Azul",
            year_published:2017,
            min_players:2,
            max_players:4,
            min_playtime:30,
            max_playtime:60,
            min_age:8,
            description:"lorem ipsum",
            description_preview:"lorem ipsum",
            price:"27.46",
            primary_publisher:"Next Move Games",
            num_user_ratings:186,
            average_user_rating:3.639784946236558,
        },
    
    ]};
        resolved(game);
    };
}

let HttpCall = {
    get: genericMethodCall("GET"),
    post: genericMethodCall("POST"),
    put: genericMethodCall("PUT"),
    delete: genericMethodCall("DELETE")
}

module.exports = HttpCall;