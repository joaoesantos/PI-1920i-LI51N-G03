"use strict";

// const webapi = require('./ciborg-web-api.js'); é necessario?

let router = function (request, response) {
   
    //nativate(request,response);
};

// registered route templates
router.routes = [];

router.nativate = function(req, res) {
    // find command by matching url with route templates
    if(routes.length != 0) {
        routes.forEach(function(route) {
            // find params and replace them with regex
            let template = route.url.replace(/:\w+/g, `([^/]+)`);
            // convert to regex and only match from start to end
            template = new RegExp(`^${template}$`);
            // matchObj will be null is there is no match
            let matchObj = _url.match(template);
            if(matchObj != null) {
                // add parameter to request
                let params =  createParameterObject(route, matchObj);
                req['body'] = params;
            }
            //matchObj.service;
            console.log(req);
        });
    } else {
        //res.statusCode = '404';
    }
};

// add parameteres to request
function createParameterObject(route, matchObj) {
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

// check for duplicated routes
function hasRoute(_url) {
    let hasDuplicate = false;
    router.routes.forEach(function(route) {
    if(_url === route.url)
        hasDuplicate = true;
    });
    return hasDuplicate;  
};

// add command template to routes and
function add(url, service) {
    if(!hasRoute(url))
        router.routes.push({ url : url, service : service });
};
router.get = function(req, service) { 
    add('GET ' + req.url, service);
    //req.method = 'GET';
};
router.post = function(req, service) {        
    add('POST ' + req.url, service);
    //req.method = 'POST';
};
router.put = function(req, service) {
    add('PUT ' + req.url, service);
    //req.method = 'PUT';
};
router.delete = function(req, service) {
    add('DELETE ' + req.url, service);
    //req.method = 'DELETE'
};

module.exports = router;