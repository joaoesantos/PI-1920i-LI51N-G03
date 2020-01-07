'use strict';

//const props = require('../../libs/CIBORG/shared/Config')('../../libs/CIBORG/shared/files');

function GroupsApiUris() {
    const baseUri = 'http://localhost:8500/';
    //const baseUri = `http://localhost:${props.config.port}/`

    this.getAllUserGroupsUri = () => `${baseUri}groups`;
    this.createGroupUri = () => `${baseUri}groups`;
    this.getGroupUri = (id) => `${baseUri}groups/${id}`;
    this.updateGroupUri = (id) => `${baseUri}groups/${id}`;
    this.addGameToGroupUri = (groupId, gameId) => `${baseUri}groups/${groupId}/games/${gameId}`;
    this.removeGameFromGroupUri = (groupId, gameId) => `${baseUri}groups/${groupId}/games/${gameId}`;
}

const Uris = new GroupsApiUris();

function getAllUserGroups() {
    return fetch(Uris.getAllUserGroupsUri())
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        });
}

function createGroup(name, description) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            description: description,
            games: []
        })
    };
    return fetch(Uris.createGroupUri(), options)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        });
}

function getGroup(id) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestConfigs = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
    return fetch(Uris.getGroupUri(id), requestConfigs)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
        .then((rsp) => {
            let group = {
                groupId: rsp.payload.id,
                groupName: rsp.payload.name,
                groupDescription: rsp.payload.description,
                header: ["ID", "Name", "Min Playtime (mins)", "Max Playtime (mins)"],
                elements: rsp.payload.games
            };
            return group;
        });
}

function updateGroup(group) {
    let id = group.id;
    delete group.id;
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestConfigs = {
        method: 'PUT',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(group)
    };
    return fetch(Uris.updateGroupUri(id), requestConfigs)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
        .then((rsp) => {
            return rsp.payload.id;
        });
}

function addGameToGroup(groupId, gameId) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestConfigs = {
        method: 'PUT',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
    return fetch(Uris.addGameToGroupUri(groupId, gameId), requestConfigs)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
        .then((rsp) => {
            return rsp.payload.id;
        });
}

function removeGameFromGroup(groupId, gameId) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestConfigs = {
        method: 'Delete',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
    return fetch(Uris.removeGameFromGroupUri(groupId, gameId), requestConfigs)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
        .then((rsp) => {
            return groupId; // HMMMMMM
        });
}

module.exports = {
    getAllUserGroups: getAllUserGroups,
    createGroup: createGroup,
    getGroup: getGroup,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup,
    removeGameFromGroup: removeGameFromGroup
}