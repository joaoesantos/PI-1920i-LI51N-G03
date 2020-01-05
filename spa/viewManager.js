"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
require('../spa/stylesheets/login.css');
// groups
require('../spa/stylesheets/getAllUserGroups.css');

const templates = require('./templateManager');

module.exports = {
    home: home,
    table: table,
    login: login,
    games: games,
    getAllUserGroups: getAllUserGroups,
    createGroup: createGroup,
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
        routesManager.changeRoute('createGroup', {name : formName.value, description : formDescription.value});
    }
}

function createGroup(data, routesManager) {
    routesManager.changeRoute('getAllUserGroups');
}

function table(data, routesManager) {
    routesManager.setMainContent(templates.table(data));
}

function login(data, routeManager){
    routeManager.setMainContent(templates.login(data));
    const formLogin = document.querySelector("#loginForm")
    formLogin.addEventListener('submit', handleSubmit)

        function handleSubmit(e) {
            e.preventDefault()
            const userId = document.querySelector("#userId");
            const password = document.querySelector("#password");

            let fromServer = fetch('/login',{
                method: 'POST',
                body: JSON.stringify(
                    {userId : userId.value, password : password.value}
                ),
                headers: {"Content-Type": "application/json"}
              })

            fromServer.then(function(response){
                routeManager.changeRoute('home');
            })
            .catch(function(error){
                alert(error);
            });
            routeManager.changeRoute('home');
        }
}

function games(data, routeManager){
    routeManager.setMainContent(templates.games(data));
}