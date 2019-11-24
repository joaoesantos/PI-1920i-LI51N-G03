let genericMethodCall = (method) => {
    return async(options) => {
        return new Promise(function(resolve, reject) {
                resolve({body: {
                    games : 
                [{
                id:"fG5Ax8PA7n",
                name:"Monopoly",
                year_published:1933,
                min_players:2,
                max_players:6,
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
                id:"levMwXaCM6",
                name:"Monopoly Deal Card Game",
                year_published:2008,
                min_players:2,
                max_players:5,
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
        
        ]}});
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