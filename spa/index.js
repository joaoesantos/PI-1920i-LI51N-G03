"use script";

const routes = require("./routesManager");

window.addEventListener('load', loadHandler)

function loadHandler() {
    console.log(routes);
    window.addEventListener('hashchange', hashChangeHandler);
    hashChangeHandler();
    const mainContent = document.querySelector("#mainContent");

    // <div id = "mainContent" > < /div>

    let routeData = null;

    const routeManager = {
        setMainContent: function(html) {
            mainContent.innerHTML = html;
        },

        changeRoute: function(hash, data) {
            routeData = data;
            window.location.hash = hash;
        }
    }

    function addRouteData(args) {
        args.push(routeData);
        resetRouteData();
    }

    function resetRouteData() {
        routeData = null;
    }

    function hashChangeHandler() {
        console.log("------------------------------------------");
        const hash = window.location.hash.substring(1)
        let [state, ...args] = hash.split('/')

        console.log(state);

        let route = routes[state];

        console.log(route);

        if (!route) {
            window.location.hash = "home";
            return;
        }

        console.log(args);

        addRouteData(args)
        route
            .controller.apply(null, args)
            .then(data => route.view(data, routeManager))
            .then(() => resetRouteData())
    }

}