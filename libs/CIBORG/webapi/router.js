"use strict";

const ciborgError = require('./../errors/ciborg-error.js');
const webapi = require('./ciborg-web-api.js');

// navigates request to api method and gets response if possibel
let router = function (request, response) {
       // if a POST method, colects all data before processing request
       if (request.method === 'POST') {
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          processRouter;
        });
      } else {
        response.statusCode = '404';
        response.end();
      }

};

// registered route templates
router.routes = [];

// process request and deals with errors
function processRouter(req, rsp) {
    try {
        navigate(req, rsp, processRequest);
    } catch(error) {
        rsp.statusCode = error.statusCode;
        rsp.statusMessage = error.statusMessage;
        rsp.write(error.clientErrorMessage);
        rsp.end();
    }

    function processRequest(err, req, rsp) {
        if(err) {
            rsp.statusCode = err.statusCode;
            rsp.statusMessage = err.statusMessage;
            rsp.write(err.clientErrorMessage);
            rsp.end();
        }   
    }

}

// navigate url and calls web-api services if exists
router.navigate = function(err, req, rsp) {
    // find command by matching url with route templates
    if(router.routes.length == 0) {
        err = new ciborgError(
            'No routes implemented yet.',
            'Command does not exist.',
            'XXX',
            '404' // Not Found
        );
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
            try {
                // call web-api
                route.webapi;
                if(err) {
                    rsp.statusCode = err.statusCode;
                    rsp.statusMessage = err.statusMessage;
                    rsp.write(err.clientErrorMessage);
                    rsp.json(rsp.body);
                }     
            } catch(error) {
                rsp.statusCode = error.statusCode;
                rsp.statusMessage = error.statusMessage;
                rsp.write(error.clientErrorMessage);
                rsp.end();
            }
            return true;
        } else {
            err = new ciborgError(
                'Template does not match with url.',
                'Command does not exist.',
                'XXX',
                '400' // Bad Request
            );
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
    return 'Received a PUT HTTP method';
};
router.delete = function(template, webapi) {
    add('DELETE ' + template, webapi);
    return 'Received a DELETE HTTP method';
};

module.exports = router;