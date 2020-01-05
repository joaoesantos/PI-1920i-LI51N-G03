"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
require('../spa/stylesheets/login.css');

const templates = require('./templateManager');

module.exports = {
    home: home,
    getAllUserGroups: getAllUserGroups,
    createGroup: createGroup,
    table: table,
    login: login,
}

function home(data, routesManager) {
    routesManager.setMainContent(templates.home(data));
}

function getAllUserGroups(data, routesManager) {
    console.log(data);
    routesManager.setMainContent(templates.getAllUserGroups(data));
    const formCreateGroup = document.querySelector("#createGroup");
    formCreateGroup.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault()
        const formName = document.querySelector("#formName")
        const formDescription = document.querySelector("#formDescription")
        routesManager.changeRoute('createGroup', {name : formName.value, description : formDescription.value})
    }
}

function createGroup(data, routesManager){
    routesManager.changeRoute('getAllUserGroups');
}

function table(data, routesManager) {
    routesManager.setMainContent(templates.table(data));
}

function login(data, routesManager){
    routesManager.setMainContent(templates.login(data))
}