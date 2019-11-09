"use strict";

let assert = require('assert');
const CiborgError = require('../../libs/CIBORG/errors/ciborg-error');
const http = require('http');
const httpCall = require('../../libs/CIBORG/request/HttpCall');
const webapi = require('./web-api-mock.js')();
const router = require('./../../libs/CIBORG/webapi/router')(CiborgError);

const config = {
    port: 9200,
}

// regist routes
router.get('/games', webapi.getAllGames);
router.get('/games/:name', webapi.getGame);
router.post('/groups', webapi.createGroup);
router.put('/groups/:id', webapi.updateGroup);
router.get('/groups', webapi.getAllGroups);
router.get('/groups/:id', webapi.getGroup);
router.put('/groups/:id/games/:name', webapi.addGameToGroup);
router.delete('/groups/:id/games/:name', webapi.removeGameFromGroup);
router.get('/groups/:id/games', webapi.getGamesFromGroup);
//console.log(router.routes);

const server = http.createServer(router);
server.listen(config.port);

describe('Router test:', function() {

    it('Error CiborgError 404', function(done) {
        let options = {
            url: 'http://localhost:9200/error',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('Command does not exist.', JSON.parse(rsp.body).payload);
            done();            
        },() => {}); // (err) => {console.log(err)}
    });

    it('Should return getAllGames', function(done) {
        let options = {
            url: 'http://localhost:9200/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getAllGames', JSON.parse(rsp.body).payload);
            done();
        },() => {}); // (err) => {console.log(err)}
    });

    
    it('Should return getGame', function(done) {
        let options = {
            url: 'http://localhost:9200/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGame', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return createGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.post(options,(rsp) => {
            assert.equal('createGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return updateGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(rsp) => {
            assert.equal('updateGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return getAllGroups', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getAllGroups', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return getGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return addGameToGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(rsp) => {
            assert.equal('addGameToGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

    it('Should return removeGameFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.delete(options,(rsp) => {
            assert.equal('removeGameFromGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

    it('Should return getGamesFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGamesFromGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

});

//server.setTimeout(2000, () => server.close());