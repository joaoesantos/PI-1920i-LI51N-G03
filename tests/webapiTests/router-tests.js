"use strict";

/*
REQUEST
destroy()	 
headers	Returns a key-value pair object containing header names and values
httpVersion	Returns the HTTP version sent by the client
method	Returns the request method
rawHeaders	Returns an array of the request headers
rawTrailers	Returns an array of the raw request trailer keys and values
setTimeout()	Calls a specified function after a specified number of milliseconds
statusCode	Returns the HTTP response status code
socket	Returns the Socket object for the connection
trailers	Returns an object containing the trailers
url	Returns the request URL string
*/

/*
RESPONSE
addTrailers()	Adds HTTP trailing headers
end()	Signals that the the server should consider that the response is complete
finished	Returns true if the response is complete, otherwise false
getHeader()	Returns the value of the specified header
headersSent	Returns true if headers were sent, otherwise false
removeHeader()	Removes the specified header
sendDate	Set to false if the Date header should not be sent in the response. Default true
setHeader()	Sets the specified header
setTimeout	Sets the timeout value of the socket to the specified number of milliseconds
statusCode	Sets the status code that will be sent to the client
statusMessage	Sets the status message that will be sent to the client
write()	Sends text, or a text stream, to the client
writeContinue()	Sends a HTTP Continue message to the client
writeHead()	Sends status and response headers to the client
 */

let assert = require('assert');
const router = require('./../../libs/CIBORG/webapi/router.js');

function mockRequest() {
    let req = {};
    req.headers;
    req.method;
    req.statusCode;
    req.url;
    return req;
};   
let req = mockRequest();
 
function mockResponse() {
    let res = {};
    res.finished = false;
    res.statusCode;
    res.statusMessage;
    return res;
};
let rsp = mockResponse();

// add routes
router.get('/games', 'webapi.getAllGames');
router.get('/games/:name', 'webapi.getGame');
router.post('/groups', 'webapi.createGroup');
router.put('/groups/:id', 'webapi.updateGroup');
router.get('/groups', 'webapi.getAllGroups');
router.get('/groups/:id', 'webapi.getGroup');
router.put('/groups/:id/games/:name', 'webapi.addGameToGroup');
router.delete('/groups/:id/games/:name', 'webapi.removeGameFromGroup');
router.get('/groups/:id/games', 'webapi.getGamesFromGroup');
//console.log(router.routes);


req.method = 'GET'; req.url = 'GET /games';
console.log(req)
router.navigate(req, rsp);
console.log(rsp.statusMessage);

/*
describe('Router test:', function() {


    req.method = 'GET'; req.url = '/games';
    it('Should return getAllGames web-api', function(done) {
        router.navigate(req, res);
        console.log(res.statusMessage)
        assert.equal("getAllGames",res.name);
        done();
    });


    it('Should return getGroup web-api', function(done) {
    router.navigate({ url :'GET /group/1'});
        service.searchByName("Monopoly",function(res){
            assert.equal(0,res.name);
            done();
        });
    });


    it('Should return addGameToGroup web-api', function(done) {
    router.navigate({ url :'PUT /groups/1/games/Xadrez'})
        service.searchByName("Monopoly",function(res){
            assert.equal(0,res.name);
            done();
        });
    });


    it('Should return no web-api', function(done) {
        service.searchByName("Monopoly",function(res){
            assert.equal(null,res.name);
            done();
        });
    });

});
*/
