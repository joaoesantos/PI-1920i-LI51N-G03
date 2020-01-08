'use strict';

let defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Accept", "application/json");

const menuOptions = [{
        label: "Home",
        hash: "home",
        login: true
    },
    {
        label: "Login",
        hash: "login",
        login: false
    },
    {
        label: "Logout",
        hash: "logout",
        login: true
    },
    {
        label: "Games",
        hash: "games",
        login: true
    },
    {
        label: "Search Games",
        hash: "searchGames",
        login: true
    },
    {
        label: "Groups",
        hash: "groups",
        login: true
    }
];

module.exports = {
    defaultHeaders: defaultHeaders,
    apiBaseUrl: "http://localhost:8500",
    menuOptions: menuOptions
};