'use strict';

const clientSideConfigs = require("../clientSideConfigs");

module.exports = {
    getGroups: getGroups,
    createGroup: createGroup,
    getGroup: getGroup,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup,
    removeGameFromGroup: removeGameFromGroup
};

function GroupsApiUris() {
    const baseUri = clientSideConfigs.apiBaseUrl;

    this.groupsUri = () => `${baseUri}/groups`;
    this.createGroupUri = () => `${baseUri}/groups`;
    this.getGroupUri = (id) => `${baseUri}/groups/${id}`;
    this.updateGroupUri = (id) => `${baseUri}/groups/${id}`;
    this.addGameToGroupUri = (groupId, gameId) => `${baseUri}/groups/${groupId}/games/${gameId}`;
    this.removeGameFromGroupUri = (groupId, gameId) => `${baseUri}/groups/${groupId}/games/${gameId}`;
};

const Uris = new GroupsApiUris();

function getGroups() {
    const options = {
        method: "GET",
        headers: clientSideConfigs.defaultHeaders
    };
    return fetch(Uris.groupsUri(), options)
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
        headers: clientSideConfigs.defaultHeaders,
        body: JSON.stringify({
            name: name,
            description: description,
            games: []
                //falta aqui acrescentar o dono, ou acrescenta-se no backend?
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
    let requestConfigs = {
        method: 'GET',
        headers: clientSideConfigs.defaultHeaders
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
};

function updateGroup(group) {
    let id = group.id;
    delete group.id;
    let requestConfigs = {
        method: 'PUT',
        headers: clientSideConfigs.defaultHeaders,
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
};

function addGameToGroup(groupId, gameId) {
    let requestConfigs = {
        method: 'PUT',
        headers: clientSideConfigs.defaultHeaders
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
};

function removeGameFromGroup(groupId, gameId) {
    let requestConfigs = {
        method: 'Delete',
        headers: clientSideConfigs.defaultHeaders
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
            return groupId;
        });
};