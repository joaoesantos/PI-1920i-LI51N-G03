'use strict'

function GroupsApiUris() {
    const baseUri = "http://localhost:8500/"
  
    this.getAllUserGroupsUri =  () => `${baseUri}groups`
    this.createGroupUri =  () => `${baseUri}groups`
}

const Uris = new GroupsApiUris()

function getAllUserGroups(){
    return fetch(Uris.getAllUserGroupsUri())
        .then(res => res.json())
}

function createGroup(name, description){
    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            name : name,
            description : description,
            games: []
        })
    }
    return fetch(Uris.createGroupUri(), options)
        .then(res => res.json()) 
}

module.exports  = {
    getAllUserGroups : getAllUserGroups,
    createGroup : createGroup
}