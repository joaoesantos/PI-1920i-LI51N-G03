"use strict";

function GameDto(id, name, year_published, min_players, max_players, min_playtime, max_playtime, min_age, description, description_preview, price, primary_publisher, num_user_ratings,average_user_rating) {
    let game = {};
    
    game.id = id;
    game.name = name;
    game.year_published = year_published;
    game.min_players = min_players;
    game.max_players = max_players;
    game.min_playtime = min_playtime;
    game.max_playtime = max_playtime;
    game.min_age = min_age;
    game.description = description;
    game.description_preview = description_preview;
    game.price = price;
    game.primary_publisher = primary_publisher;
    game.num_user_ratings = num_user_ratings;
    game.average_user_rating = average_user_rating;

    return game;
}

module.exports = GameDto