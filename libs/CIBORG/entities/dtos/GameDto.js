"use strict";

var GameDto = class GameDto {
    #id;
    #name;
    #year_published;
    #min_players;
    #max_players;
    #min_playtime;
    #max_playtime;
    #min_age;
    #description;
    #description_preview;
    #price;
    #primary_publisher;
    #num_user_ratings;
    #average_user_rating;
    constructor(id, name, year_published, min_players, max_players, min_playtime, max_playtime, min_age, description, description_preview, price, primary_publisher) {
        this.id = id;
        this.name = name;
        this.year_published = year_published;
        this.min_players = min_players;
        this.max_players = max_players;
        this.min_playtime = min_playtime;
        this.max_playtime = max_playtime;
        this.min_age = min_age;
        this.description = description;
        this.description_preview = description_preview;
        this.price = price;
        this.primary_publisher = primary_publisher;
        this.num_user_ratings = num_user_ratings;
        this.average_user_rating = average_user_rating;
     }

    get id() {
        return this.#id;
    };
    get name() {
        return this.#name;
    };
    get year_published() {
        return this.#year_published;
    };
    get min_players() {
        return this.#min_players;
    };
    get max_players() {
        return this.#max_players;
    };
    get min_playtime() {
        return this.#min_playtime;
    };
    get max_playtime() {
        return this.#max_playtime;
    };
    get min_age() {
        return this.#min_age;
    };
    get description() {
        return this.#description;
    };
    get description_preview() {
        return this.#description_preview;
    };
    get price() {
        return this.#price;
    };
    get primary_publisher() {
        return this.#primary_publisher;
    };
    get num_user_ratings() {
        return this.#num_user_ratings;
    };
    get average_user_rating() {
        return this.#average_user_rating;
    };
};
module.export = GameDto