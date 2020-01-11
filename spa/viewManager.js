"use script";

// geral
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
// authentication
require('../spa/stylesheets/login.css');
// games
// groups
require('../spa/stylesheets/groups.css');

//models
const authenticationModel = require("./model/authentication");
const gamesModel = require("./model/games");

const groupView = require("./controllers/groupView");

const templates = require('./templateManager');

module.exports = {
    header: header,
    home: home,
    signIn: signIn,
    login: login,
    logout: logout,
    games: games,
    groups: groups,
    createGroup: createGroup,
    group: groupView,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup,
    removeGameFromGroup: removeGameFromGroup
}

function home(data, routesManager) {
    routesManager.setMainContent(templates.home(data));
}

function signIn(data, routesManager) {
    try {
        routesManager.setMainContent(templates.signIn(data));
        const formSignIn = document.querySelector("#signInForm")
        formSignIn.addEventListener('submit', handleSubmit)

        async function handleSubmit(e) {
            e.preventDefault()
            const userId = document.querySelector("#userId");
            const name = document.querySelector("#name");
            const password = document.querySelector("#password");
            const repassword = document.querySelector("#repassword");
            if(password.value === repassword.value) {
                await authenticationModel.signIn(userId.value, name.value, password.value);
                routesManager.showAlert('Account created with success.', 0);
                routesManager.changeRoute('login');
            } else {
                routesManager.showAlert('Passwords do not match.', 3);
            }
        }
    } catch (err) {
        routesManager.showAlert(err.message, 3);
    }
}

function login(data, routesManager) {
    try {
        routesManager.setMainContent(templates.login(data));
        const formLogin = document.querySelector("#loginForm")
        formLogin.addEventListener('submit', handleSubmit)

        async function handleSubmit(e) {
            e.preventDefault()
            const userId = document.querySelector("#userId");
            const password = document.querySelector("#password");
            let response = await authenticationModel.login(userId.value, password.value);
            routesManager.changeRoute('home', response);
        }
    } catch (err) {
        routesManager.showAlert(err.message, 3);
    }
}

function logout(data, routesManager) {
    routesManager.changeRoute('home');
}

function games(data, routesManager) {
    routesManager.setMainContent(templates.games(data));

    const searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener('click', handleClick);

    async function handleClick(e) {
        const gameName = document.querySelector("#gameName").value;
        const gameNamePath = gameName ? "/" + gameName : "";
        routesManager.changeRoute(`#games${gameNamePath}`);
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

    const rows = document.querySelectorAll("[id*=gameid_]");

    rows.forEach(row => {
        row.addEventListener('click', handleRowClick);
    });

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