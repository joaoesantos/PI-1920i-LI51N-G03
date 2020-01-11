const templates = require("../templateManager");
const gamesModel = require("../model/games");

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
            console.log(gameMins[i].innerText)
            let game = {
                id: gameIds[i].innerText,
                name: gameNames[i].innerText,
                min_playtime: (gameMins[i].innerText === "-") ? null : Number(gameMins[i].innerText),
                max_playtime: (gameMaxs[i].innerText === "-") ? null : Number(gameMaxs[i].innerText)
            };
            group.games.push(game);
        }
        routeManager.changeRoute('updateGroup', group);
    }

    const searchGameForm = document.querySelector("#searchGameForm");
    searchGameForm.addEventListener('submit', handleSubmitSearchGameForm);

    async function handleSubmitSearchGameForm(e) {
        try {
            e.preventDefault();

            const gameName = document.querySelector("#searchGameName").value;

            const response = await gamesModel.searchGamesByName(gameName);
            let games = response.payload;
            let rows = "";
            for (let i = 0; i < games.length; i++) {
                let game = games[i];
                let minPlayTime = game.min_playtime ? game.min_playtime : "-";
                let maxPlayTime = game.max_playtime ? game.max_playtime : "-";
                let addGameToGroupButton = `<button id="${i}" name="addGameToGroup" type="button" class="btn btn-primary">Add game to group</button>`;
                let row = `<tr> <td name="searchGameId">${game.id}</td> <td>${game.name}</td> <td>${minPlayTime}</td> <td>${maxPlayTime}</td> <td>${addGameToGroupButton}</td> </tr>`;
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
        } catch (e) {
            routeManager.showAlert(e.message, 3);
        }
    }

    const removeGameToGroupButtons = document.getElementsByName("removeGameFromGroup");
    removeGameToGroupButtons.forEach(b => {
        b.addEventListener('click', handleRemoveGameToGroupButton);
    });

    function handleRemoveGameToGroupButton(e) {
        const gameIds = document.getElementsByName("gameId");
        const gameId = gameIds[e.toElement.attributes[0].value].innerText;
        const groupId = document.querySelector("#groupId").value;
        routeManager.changeRoute('removeGameFromGroup', { groupId: groupId, gameId: gameId });
    }
}

module.exports = group;