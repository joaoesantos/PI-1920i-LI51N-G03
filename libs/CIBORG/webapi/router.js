"use strict";

// const webapi = require('./ciborg-web-api.js'); é necessario?

//
let router = function (request, response) {
    //nativate(request,response);
};

// registered route templates
router.routes = [];

function processRequest(req, rsp) {

    console.log(req.method)
    console.log(req.url)
    console.log(req.headers)

    let data = ""

    req.on('data', chunck => data += chunck.toString());
    req.on('end', processBodyAndResponse);

    function processBodyAndResponse() {
        console.log('Received : ', data)
        res.setHeader('Content-Type','text/plain')
        res.end('Received and Done')
    }
    
}

// navigate url and calls web-api services if exists
router.navigate = function(req, rsp) {
    // find command by matching url with route templates
    if(router.routes.length == 0) {
        rsp.statusCode = '404';
        rsp.statusMessage = 'There is no routes implemented.';
        //res.end(); 
        return;
    }
    // matches url with templates
    router.routes.some(function(route) {
        // finds parameters and replace them with regex
        let template = route.template.replace(/:\w+/g, `([^/]+)`);
        // convert to regex and only match from start to end
        template = new RegExp(`^${template}$`);
        // matchObj will be null is there's no match
        let matchObj = req.url.match(template);
        if(matchObj != null) {
            // add parameters to request if there's any
            addParametersToRequest(req, route, matchObj);
            // call web-api
            route.webapi;
            rsp.statusMessage = route.webapi;
            return true;
        } else {
            rsp.statusCode = '404';
            rsp.statusMessage = 'Command ' + req.url + ' does not exist.';
            //res.end(); 
        }
    });

};

// add parameteres to request body
function addParametersToRequest(req, route, matchObj) {
    let body = {};
    let params = route.template.match(/:\w+/g);
    if(params != null) { // has more parameters
        for(let i = 0; i <params.length; i++) {
            body[params[i].substring(1)] = matchObj[i+1];
        }
        req['body'] = body;
    }
}

// check for duplicated routes
function hasRoute(url) {
    let hasDuplicate = false;
    router.routes.forEach(function(route) {
    if(url === route.url)
        hasDuplicate = true;
    });
    return hasDuplicate;  
};

// add new template to routes
function add(template, webapi) {
    if(!hasRoute(template))
        router.routes.push({ template : template, webapi : webapi });
};
router.get = function(template, webapi) { 
    add('GET ' + template, webapi);
    return 'Received a GET HTTP method';
};
router.post = function(template, webapi) {        
    add('POST ' + template, webapi);
    return 'Received a POST HTTP method';
};
router.put = function(template, webapi) {
    add('PUT ' + template, webapi);
    //return res.send('Received a PUT HTTP method');
};
router.delete = function(template, webapi) {
    add('DELETE ' + template, webapi);
    return 'Received a DELETE HTTP method';
};

module.exports = router;