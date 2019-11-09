let GameServices = {
    getGamesById : function(gameId, cb) {
        let reponse = {
            statusCode: 202,
            body: {
                id:"levMwXaCM6",
                name:"Monopoly Deal Card Game",
                min_playtime:90,
                max_playtime:120
            }
        }
        cb(null ,reponse);
    }
}
module.exports = GameServices