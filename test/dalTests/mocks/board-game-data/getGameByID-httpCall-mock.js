let genericMethodCall = (method) => {
    return async(options) => {
        return new Promise(function(resolve, reject) {
            setTimeout(()=>{
                resolve({body: {
                    games :
                [{
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
            }]}});
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