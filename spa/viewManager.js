"use script";

// geral
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
// authentication
//require('../spa/stylesheets/login.css');
// games
// groups
require('../spa/stylesheets/groups.css');

//models
const authenticationModel = require("./model/authentication");
const gamesModel = require("./model/games");

const groupView = require("./controllers/groupView");

const templates = require('./templateManager');

module.exports = {
    home: home,
    login: login,
    logout: logout,
    games: games,
    groups: groups,
    createGroup: createGroup,
    group: groupView,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup,
    removeGameFromGroup: removeGameFromGroup,
    header: header
}

function home(data, routesManager) {
    routesManager.setMainContent(templates.home(data));
}

function login(data, routeManager) {
    routeManager.setMainContent(templates.login(data));
    const formLogin = document.querySelector("#loginForm")
    formLogin.addEventListener('submit', handleSubmit)

    async function handleSubmit(e) {
        e.preventDefault()
        const userId = document.querySelector("#userId");
        const password = document.querySelector("#password");

        let response = await authenticationModel.login(userId.value, password.value);

        routeManager.changeRoute('home', response);
    }
}

function logout(data, routesManager) {
    routesManager.changeRoute('home');
}

function games(data, routeManager) {
    routeManager.setMainContent(templates.games(data));

    const searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener('click', handleClick);

    async function handleClick(e) {
        const gameName = document.querySelector("#gameName").value;
        const gameNamePath = gameName ? "/" + gameName : "";
        routeManager.changeRoute(`#games${gameNamePath}`);
    }
}

function groups(data, routesManager) {
    routesManager.setMainContent(templates.groups(data));
    const formCreateGroup = document.querySelector("#createGroup");
    formCreateGroup.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();
        const formName = document.querySelector("#formName");
        const formDescription = document.querySelector("#formDescription");
        routesManager.changeRoute('createGroup', { name: formName.value, description: formDescription.value });
    }

    const rows = document.querySelector(".clickable-row");
    rows.addEventListener('click', handleRowClick);

    function handleRowClick(e){
        window.location = this.getAttribute("data-href"); 
    }
}

function createGroup(data, routesManager) {
    routesManager.changeRoute('groups');
}

function updateGroup(data, routesManager) {
    routesManager.changeRoute(`group/${data}`);
}

function addGameToGroup(data, routesManager) {
    routesManager.changeRoute(`group/${data}`);
}

function removeGameFromGroup(data, routesManager) {
    routesManager.changeRoute(`group/${data}`);
}

function header(data, headerManager) {
    headerManager.setHeaderContent(templates.header(data));
}