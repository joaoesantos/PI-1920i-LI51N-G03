"use strict";

var GameDto = class GameDto {
    #_id;
    #_name;
    #_year_published;
    #_min_players;
    #_max_players;
    #_min_playtime;
    #_max_playtime;
    #_min_age;
    #_description;
    #_description_preview;
    #_price;
    #_primary_publisher;
    #_num_user_ratings;
    #_average_user_rating;
    constructor(id, name, year_published, min_players, max_players, min_playtime, max_playtime, min_age, description, description_preview, price, primary_publisher, num_user_ratings,average_user_rating) {
        this.#_id = id;
        this.#_name = name;
        this.#_year_published = year_published;
        this.#_min_players = min_players;
        this.#_max_players = max_players;
        this.#_min_playtime = min_playtime;
        this.#_max_playtime = max_playtime;
        this.#_min_age = min_age;
        this.#_description = description;
        this.#_description_preview = description_preview;
        this.#_price = price;
        this.#_primary_publisher = primary_publisher;
        this.#_num_user_ratings = num_user_ratings;
        this.#_average_user_rating = average_user_rating;
     }

    get id() {
        return this.#_id;
    };
    get name() {
        return this.#_name;
    };
    get year_published() {
        return this.#_year_published;
    };
    get min_players() {
        return this.#_min_players;
    };
    get max_players() {
        return this.#_max_players;
    };
    get min_playtime() {
        return this.#_min_playtime;
    };
    get max_playtime() {
        return this.#_max_playtime;
    };
    get min_age() {
        return this.#_min_age;
    };
    get description() {
        return this.#_description;
    };
    get description_preview() {
        return this.#_description_preview;
    };
    get price() {
        return this.#_price;
    };
    get primary_publisher() {
        return this.#_primary_publisher;
    };
    get num_user_ratings() {
        return this.#_num_user_ratings;
    };
    get average_user_rating() {
        return this.#_average_user_rating;
    };
};
module.exports = GameDto