'use strict';

module.exports = {
    getGroups: getGroups,
    createGroup: createGroup,
    getGroup: getGroup,
    updateGroup: updateGroup,
    addGameToGroup: addGameToGroup,
    removeGameFromGroup: removeGameFromGroup
};

function GroupsApiUris() {
    const baseUri = 'http://localhost:8500/';

    this.groupsUri = () => `${baseUri}groups`;
    this.createGroupUri = () => `${baseUri}groups`;
    this.getGroupUri = (id) => `${baseUri}groups/${id}`;
    this.updateGroupUri = (id) => `${baseUri}groups/${id}`;
    this.addGameToGroupUri = (groupId, gameId) => `${baseUri}groups/${groupId}/games/${gameId}`;
    this.removeGameFromGroupUri = (groupId, gameId) => `${baseUri}groups/${groupId}/games/${gameId}`;
};

const Uris = new GroupsApiUris();

function getGroups() {
    return fetch(Uris.groupsUri())
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
        });
};

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
        });
};

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
        .then((rsp) => {
            return rsp.payload.id;
        });
};

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
        .then((rsp) => {
            return rsp.payload.id;
        });
};

function removeGameFromGroup(groupId, gameId) {
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };
    return fetch(Uris.removeGameFromGroupUri(groupId, gameId), options)
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
        .then((rsp) => {
            return rsp.payload; // HMMMMMM
        });
};