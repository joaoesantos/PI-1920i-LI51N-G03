"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
require('../spa/stylesheets/login.css');
// groups
require('../spa/stylesheets/getAllUserGroups.css');

const templates = require('./templateManager');
const groups = require('./model/groups');

module.exports = {
    home: home,
    table: table,
    login: login,
    games: games,
    getAllUserGroups: getAllUserGroups,
    createGroup: createGroup,
    group: group,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup
}

function home(data, routesManager) {
    routesManager.setMainContent(templates.home(data));
}

function getAllUserGroups(data, routesManager) {
    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // };
    // const doSomething = async () => {
    //     await sleep(2000)
    //     //do stuff
    // };
    // doSomething();
    routesManager.setMainContent(templates.getAllUserGroups(data));
    const formCreateGroup = document.querySelector("#createGroup");
    formCreateGroup.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();
        const formName = document.querySelector("#formName");
        const formDescription = document.querySelector("#formDescription");
        routesManager.changeRoute('createGroup', { name: formName.value, description: formDescription.value });
    }
}

function createGroup(data, routesManager) {
    routesManager.changeRoute('getAllUserGroups');
}

function table(data, routesManager) {
    routesManager.setMainContent(templates.table(data));
}

function login(data, routeManager) {
    routeManager.setMainContent(templates.login(data));
    const formLogin = document.querySelector("#loginForm")
    formLogin.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        e.preventDefault()
        const userId = document.querySelector("#userId");
        const password = document.querySelector("#password");

        let fromServer = fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ userId: userId.value, password: password.value }),
            headers: { "Content-Type": "application/json" }
        })

        fromServer.then(function(response) {
                routeManager.changeRoute('home');
            })
            .catch(function(error) {
                alert(error);
            });
        routeManager.changeRoute('home');
    }
}

function games(data, routeManager) {
    routeManager.setMainContent(templates.games(data));
}

function group(data, routeManager) {
    routeManager.setMainContent(templates.group(data));

    const backToGroupsButton = document.querySelector("#backToGroups");
    backToGroupsButton.addEventListener('click', handleClickBackToGroupsButton);

    function handleClickBackToGroupsButton(e) {
        routeManager.changeRoute('groups');
    }

    const updateGroupButton = document.querySelector("#updateGroup");
    updateGroupButton.addEventListener('click', handleClickUpdateGroupButton);

    function handleClickUpdateGroupButton(e) {
        let group = {
            id: document.querySelector("#groupId").value,
            name: document.querySelector("#groupName").value,
            description: document.querySelector("#groupDescription").value,
            games: []
        };

        let gameIds = document.getElementsByName("gameId");
        let gameNames = document.getElementsByName("gameName");
        let gameMins = document.getElementsByName("gameMin");
        let gameMaxs = document.getElementsByName("gameMax");

        for (let i = 0; i < gameIds.length; i++) {
            let game = {
                id: gameIds[i].innerText,
                name: gameNames[i].innerText,
                min_playtime: Number(gameMins[i].innerText),
                max_playtime: Number(gameMaxs[i].innerText)
            };
            group.games.push(game);
        }
        routeManager.changeRoute('updateGroup', group);
    }

    const searchGameForm = document.querySelector("#searchGameForm");
    searchGameForm.addEventListener('click', handleSubmitSearchGameForm);

    async function handleSubmitSearchGameForm(e) {
        e.preventDefault();

        const gameName = document.querySelector("#searchGameName").value;

        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestConfigs = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };
        const response = await fetch("http://localhost:8500/games/" + gameName, requestConfigs) //add gameName to url later
            .then((rsp) => {
                if (rsp.ok) {
                    return rsp.json();
                } else {
                    //avisa o user que deu merda
                    //throw new Error();
                }
            })
            .catch((err) => {
                //send error message
            })
        let games = response.payload;
        let rows = "";
        for (let i = 0; i < games.length; i++) {
            let game = games[i];
            let addGameToGroupButton = `<button id="${i}" name="addGameToGroup" type="button" class="btn btn-primary">Add game to group</button>`;
            let row = `<tr> <td name="searchGameId">${game.id}</td> <td>${game.name}</td> <td>${game.min_playtime}</td> <td>${game.max_playtime}</td> <td>${addGameToGroupButton}</td> </tr>`;
            rows += row;
        }
        let tableBody = document.querySelector("#searchResults");
        tableBody.innerHTML = rows;

        const addGameToGroupButtons = document.getElementsByName("addGameToGroup");
        addGameToGroupButtons.forEach(b => {
            b.addEventListener('click', handleAddGameToGroupButton);
        });

        function handleAddGameToGroupButton(e) {
            const searchGameIds = document.getElementsByName("searchGameId");
            const gameId = searchGameIds[e.toElement.attributes[0].value].innerText;
            const groupId = document.querySelector("#groupId").value
            routeManager.changeRoute('addGameToGroup', { groupId: groupId, gameId: gameId });
        }
    }
}

function updateGroup(data, routeManager) {
    routeManager.changeRoute(`group/${data}`);
}

function addGameToGroup(data, routeManager) {
    routeManager.changeRoute(`group/${data}`);
}