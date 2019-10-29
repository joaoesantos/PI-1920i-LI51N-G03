"use strict";

const webapi = require('./ciborg-web-api.js');

function router(req,rsp) {
    routes: []; // registered route templates
    root: '/'; // the root URL path of the application

    // check for duplicated routes
    this.hasRoute = function(req) {
        let hasDuplicate = false;
        this.routes.forEach(function(route) {
            if(_url === route.url)
            hasDuplicate = true;
        });
        return hasDuplicate;  
    };

    // add command template to routes
    add: function(url, service) {
        if(!this.hasRoute(url))
            this.routes.push({ url : url, service : service })
        return this;
    };
    get: function(url, service) { 
        this.add("GET " + url, service);
    };
    post: function(url, service) {        
        this.add("POST " + url, service);
    };
    put: function(url, service) {
        this.add("PUT " + url, service);
    };
    delete: function(url, service) {
        this.add("DELETE " + url, service);
    };

    // find command by matching url with route templates
    navigate: function(_url) {
        this.routes.forEach(function(route) {
            // find params and replace them with regex
            let template = route.url.replace(/:\w+/g, `([^/]+)`);
            // convert to regex and only match from start to end
            template = new RegExp(`^${template}$`);
            // matchObj will be null is there is no match
            let matchObj = _url.match(template);
            if(matchObj != null) {
                let params =  getParameters(route, matchObj);
                console.log( params );
            }
            //else
                //throw 'invalide command';
        });
    };

};

// build parameter object
function getParameters(route, matchObj) {
    let paramObj = {};
    paramObj['url'] = route.url;
    paramObj['service'] = route.service;
    let params = route.url.match(/:\w+/g);
    if(params != null) { // has more parameters
        for(let i = 0; i <params.length; i++) {
            paramObj[params[i].substring(1)] = matchObj[i+1];
        }
    }
    return paramObj;
}

// tests

// add routes
router.get('/games', webapi.getAllGames);
router.get('/games/:name', webapi.getGame);
router.post('/groups', webapi.createGroup);
router.put('/groups/:id', webapi.updateGroup);
router.get('/groups', webapi.getAllGroups);
router.get('/groups/:id', webapi.getGroup);
router.put('/groups/:id/games/:name', webapi.addGameToGroup);
router.delete('/groups/:id/games/:name', webapi.removeGameFromGroup);
router.get('/groups/:id/games', webapi.getGamesFromGroup);

// find
router.navigate('GET /games');
router.navigate('GET /games/1/1');
router.navigate('GET /games/quintela');
router.navigate('PUT /groups/10/games/xadrez');

module.exports = router;