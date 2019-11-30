let GameServices = {
    getGameByID: async function(gameName) {
        let game = {
            statusCode: 202,
            body: [{
                id: "levMwXaCM6",
                name: "Monopoly Deal Card Game",
                min_playtime: 90,
                max_playtime: 120
            }]
        }
        return Promise.resolve(game);
    }
}
module.exports = GameServices;