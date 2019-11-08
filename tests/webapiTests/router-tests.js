"use strict";

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

describe('Router test:', function() {


    req.method = 'GET'; req.url = '/games';
    it('Should return getAllGames web-api', function(done) {
        router.navigate(req, res);
        assert.equal(0,hasOwnProperty(req, body));
        done();
    });


    it('Should return id = 1', function(done) {
    router.navigate({ url :'GET /group/1'});
        service.searchByName("Monopoly",function(res){
            assert.equal('1',req.body.id);
            done();
        });
    });


    it('Should return id = 1; name = Xadrez', function(done) {
    router.navigate({ url :'PUT /groups/1/games/Xadrez'})
        service.searchByName("Monopoly",function(res){
            assert.equal('1',req.body.id);
            assert.equal('Xadrez',req.body.name);
            done();
        });
    });

});

