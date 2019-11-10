"use strict";
var debug = require('debug')('router');

let routerFunction = function(Props, CiborgError, CiborgValidator) {
    if(!Props.config && !Props.config.isDebugEnabled && Props.config.isDebugEnabled === false) {
        debug.disable();
    }
    // navigates request to api method and gets response if possibel
    let router = function (request, response) {
        // colects all data before processing request
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if(body.length === 0) {
                request.body = {}
            } else {
                // ciborg validator
                let validatorErr = CiborgValidator.validateJson(body);
                if(validatorErr)  {
                    validatorErr.resolveErrorResponse(rsp);
                }
                request.body = (body.length === 0) ? {} :JSON.parse(body);
            }
            debug("REQUEST RECEIVED");
            router.navigate(request, response);
        });
    };

    // registered route templates
    router.routes = {
        GET : [],
        POST : [],
        PUT : [],
        DELETE : [],
    }

    // navigate url and calls web-api services if exists
    router.navigate = function(req, rsp) {
        // find command by matching url with route templates
        let routes = router.routes[req.method.toUpperCase()];
        if(routes.length == 0) {
            let err = new CiborgError(
                'No routes implemented yet.',
                'Command does not exist.',
                '404' // Not Found
            );
            debug.extend("navigate")(err);
            err.resolveErrorResponse(rsp);
        }
        
        // matches url with templates
        let isMatched = routes.some(function(route) {
            // finds parameters and replace them with regex
            let template = route.template.replace(/:\w+/g, `([^/]+)`);
            // convert to regex and only match from start to end
            template = new RegExp(`^${template}$`);
            // matchObj will be null is there's no match
            let matchObj = req.url.match(template);
            if(matchObj != null) {
                // add parameters to request if there's any
                addParametersToRequest(req, route, matchObj);
                route.handler(req, rsp); // call web-api
                return true;
            } 
        });
        if(!isMatched) {
            let err = new CiborgError(
                'Template does not match with url.',
                'Command does not exist.',
                '404' // Not Found
            );
            debug.extend("navigate")(err);
            err.resolveErrorResponse(rsp);
        } else {
            debug.extend("navigate")("REQUEST MATCHED");
        }
    };

    // add parameteres to request body
    function addParametersToRequest(req, route, matchObj) {
        let parameters = {};
        let params = route.template.match(/:\w+/g);
        if(params != null) { // has more parameters
            for(let i = 0; i <params.length; i++) {
                parameters[params[i].substring(1)] = matchObj[i+1];
            }
            req.urlParameters = parameters;
        }
    }

    // check for duplicated routes
    function hasRoute(method, url) {
        let hasDuplicate = false;
        let routes = router.routes[method];
        routes.forEach(function(route) {
        if(url === route.url)
            hasDuplicate = true;
        });
        return hasDuplicate;  
    };

    // add new template to routes
    router.get = function(template, handler) { 
        if(!hasRoute('GET', template))
            router.routes['GET'].push({ template : template, handler : handler });
        //return 'Received a GET HTTP method';
    };
    router.post = function(template, handler) {        
        if(!hasRoute('POST', template))
            router.routes['POST'].push({ template : template, handler : handler });
        //return 'Received a POST HTTP method';
    };
    router.put = function(template, handler) {
        if(!hasRoute('PUT', template))
            router.routes['PUT'].push({ template : template, handler : handler });
        //return 'Received a PUT HTTP method';
    };
    router.delete = function(template, handler) {
        if(!hasRoute('DELETE', template))
            router.routes['DELETE'].push({ template : template, handler : handler });
        //return 'Received a DELETE HTTP method';
    };

    return router;
}
module.exports = routerFunction;