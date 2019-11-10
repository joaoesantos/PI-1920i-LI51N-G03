

let GameServices = {
    searchByName : function(gameName, cb) {
        let response = {
            statusCode: 202,
            body: [{
                id:"levMwXaCM6",
                name:"Monopoly Deal Card Game",
                min_playtime:90,
                max_playtime:120
            }]
        }
        cb(null ,response);
    }
}
module.exports = GameServices