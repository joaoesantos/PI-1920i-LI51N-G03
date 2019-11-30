let GameServices = {
    getGamesByID: async function(gameName) {
        let game = {
            statusCode: 202,
            body: [{
                id: "yqR4PtpO8X",
                name: "Scythe",
                min_playtime: 90,
                max_playtime: 120
            }]
        }
        return Promise.resolve(game);
    }
}
module.exports = GameServices;