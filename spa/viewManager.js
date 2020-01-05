"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');
require('../spa/stylesheets/login.css');

const templates = require('./templateManager');

module.exports = {
    home: home,
    table: table,
    login: login,
    games: games,
}

function home(data, routeManager) {
    routeManager.setMainContent(templates.home(data));
}

function table(data, routeManager) {
    routeManager.setMainContent(templates.table(data));
    
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
                alert(errror);
            });
            routeManager.changeRoute('home');
        }
}

function games(data, routeManager){
    routeManager.setMainContent(templates.games(data));
}