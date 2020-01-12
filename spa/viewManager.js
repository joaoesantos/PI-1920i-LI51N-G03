"use script";

// geral
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
// authentication
require('../spa/stylesheets/login.css');
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

function header(data, headerManager) {
    headerManager.setHeaderContent(templates.header(data));
}

function home(data, routesManager) {
    routesManager.setMainContent(templates.home(data));
}

function signIn(data, routesManager) {
    routesManager.setMainContent(templates.signIn(data));
    const formSignIn = document.querySelector("#signInForm")
    formSignIn.addEventListener('submit', handleSubmit)

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const userId = document.querySelector("#userId");
            const name = document.querySelector("#name");
            const password = document.querySelector("#password");
            const repassword = document.querySelector("#repassword");
            if(password.value === repassword.value) {
                await authenticationModel.signIn(userId.value, name.value, password.value);
                let alertmsg = {message: 'Account created with success.'};
                alertmsg.redirect = { hash: "login", data: undefined };
                routesManager.redirectAndShowAlert(alertmsg, 1);
            } else {
                routesManager.showAlert('Passwords do not match.', 3);
            }
        } catch (err) {
            routesManager.showAlert(err.message, 3);
        }
    }
}

function login(data, routesManager) {
    routesManager.setMainContent(templates.login(data));
    const formLogin = document.querySelector("#loginForm")
    formLogin.addEventListener('submit', handleSubmit)

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const userId = document.querySelector("#userId");
            const password = document.querySelector("#password");
            let response = await authenticationModel.login(userId.value, password.value);
            routesManager.changeRoute('home', response);
        } catch (err) {
            routesManager.showAlert(err.message, 3);
        }
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

    function handleRowClick(e) {
        routesManager.changeRoute(this.getAttribute("data-href"));
    }
}

function createGroup(data, routesManager) {
    let alertmsg = {message: 'Group created with success.'};
    alertmsg.redirect = { hash: 'groups', data: undefined };
    routesManager.redirectAndShowAlert(alertmsg, 1);
}

function updateGroup(data, routesManager) {
    let alertmsg = {message: 'Group updated with success.'};
    alertmsg.redirect = { hash: `group/${data}`, data: undefined };
    routesManager.redirectAndShowAlert(alertmsg, 1);
}

function addGameToGroup(data, routesManager) {
    let alertmsg = {message: 'Game added with success.'};
    alertmsg.redirect = { hash: `group/${data}`, data: undefined };
    routesManager.redirectAndShowAlert(alertmsg, 1);
}

function removeGameFromGroup(data, routesManager) {
    let alertmsg = {message: 'Game removed with success.'};
    alertmsg.redirect = { hash: `group/${data}`, data: undefined };
    routesManager.redirectAndShowAlert(alertmsg, 1);
}