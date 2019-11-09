"use strict";

let assert = require('assert');
const http = require('http');
const httpCall = require('../../libs/CIBORG/request/HttpCall');
const webapi = require('./web-api-mock.js')();
const router = require('./../../libs/CIBORG/webapi/router');

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
            assert.equal('No routes implemented yet.',rsp.body);
        },() => {}); // (err) => {console.log(err)}
        done();
    });

    it('Should return getAllGames', function(done) {
        let options = {
            url: 'http://localhost:9200/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getAllGames',rsp.body);
        },() => {}); // (err) => {console.log(err)}
        done();
    });

    it('Should return getGame', function(done) {
        let options = {
            url: 'http://localhost:9200/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGame',rsp.body);
        },() => {})
        done();
    });

    it('Should return createGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.post(options,(rsp) => {
            assert.equal('createGroup',rsp.body);
        },() => {})
        done();
    });

    it('Should return updateGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(rsp) => {
            assert.equal('updateGroup',rsp.body);
        },() => {})
        done();
    });

    it('Should return getAllGroups', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getAllGroups',rsp.body);
        },() => {})
        done();
    });

    it('Should return getGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGroup',rsp.body);
        },() => {})
        done();
    });

    it('Should return addGameToGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(rsp) => {
            assert.equal('addGameToGroup',rsp.body);
        },() => {});
        done();
    });

    it('Should return removeGameFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.delete(options,(rsp) => {
            assert.equal('removeGameFromGroup',rsp.body);
        },() => {});
        done();
    });

    it('Should return getGamesFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(rsp) => {
            assert.equal('getGamesFromGroup',rsp.body);
        },() => {});
        done();
    });

});

server.close();


