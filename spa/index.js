"use script";

const routes = require("./routesManager");

window.addEventListener('load', loadHandler)

function loadHandler() {
    window.addEventListener('hashchange', hashChangeHandler);
    hashChangeHandler();
    const mainContent = document.querySelector("#mainContent");
    const alertContent = document.querySelector("#alertContent");
    const headerContent = document.querySelector("#header");

    let routeData = null;

    const routesManager = {
        setMainContent: function(html) {
            mainContent.innerHTML = html;
        },

        changeRoute: function(hash, data) {
            routeData = data;
            window.location.hash = hash;
        },

        showAlert: showAlert,

        clearAlert: clearAlert
    }

    const headerManager = {
        setHeaderContent: function(html) {
            headerContent.innerHTML = html;
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
        const hash = window.location.hash.substring(1)
        let [state, ...args] = hash.split('/');

        let route = routes[state];

        if (!route || hash === "header") {
            window.location.hash = "home";
            return;
        }

        addRouteData(args);
        route
            .controller.apply(null, args)
            .then(data => {
                route.view(data, routesManager);
                clearAlert();
                resetRouteData();
            })
            .catch(e => showAlert(e.message, 3));

        let headerRoute = routes.header;
        headerRoute.controller().then(data => headerRoute.view(data, headerManager));
    }

    //alertLevel: 1 - sucess, 2 - warning, 3 - error, default - info
    function showAlert(alertMessage, alertLevel) {
        let html = `<div class="alert alert-info" role="alert"> ${alertMessage} </div>`;
        if (alertLevel === 1) {
            html = `<div class="alert alert-success" role="alert"> ${alertMessage} </div>`;
        } else if (alertLevel === 2) {
            html = `<div class="alert alert-warning" role="alert"> ${alertMessage} </div>`;
        } else if (alertLevel === 3) {
            html = `<div class="alert alert-danger" role="alert"> ${alertMessage} </div>`;
        }
        alertContent.innerHTML = html;
    }

    function clearAlert() {
        alertContent.innerHTML = "<div></div>";
    }
}