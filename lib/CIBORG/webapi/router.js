"use strict";

const webapi = require('./ciborg-web-api.js');

function router(request, response) {
    routes = [];    // registered route templates
    root = '/';     // the root URL path of the application

    // check for duplicated routes
    this.hasRoute = function(_url) {
        let hasDuplicate = false;
        this.routes.forEach(function(route) {
            if(_url === route.url)
            hasDuplicate = true;
        });
        return hasDuplicate;  
    };

    // add command template to routes and
    this.add = function(req, service) {
        if(!this.hasRoute(req.url))
            this.routes.push({ url : req.url, service : service })
        return this;
    };
    this.get = function(req, service) { 
        this.add('GET ' + request.url, service);
        //req.method = 'GET';
    };
    this.post = function(req, service) {        
        this.add('POST ' + req.url, service);
        //req.method = 'POST';
    };
    this.put = function(req, service) {
        this.add('PUT ' + req.url, service);
        //req.method = 'PUT';
    };
    this.delete = function(req, service) {
        this.add('DELETE ' + req.url, service);
        //req.method = 'DELETE'
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