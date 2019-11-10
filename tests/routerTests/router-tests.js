"use strict";

let assert = require('assert');
const Props = require('../../libs/CIBORG/shared/Config')("../../libs/CIBORG/shared/files");
const CiborgError = require('../../libs/CIBORG/errors/ciborg-error');
const CiborgValidator = require('../../libs/CIBORG/validators/ciborg-validator');
const http = require('http');
const httpCall = require('../../libs/CIBORG/request/HttpCall')(Props, CiborgError);
const webapi = require('./web-api-mock.js')();
const router = require('../../libs/CIBORG/webapi/router')(Props, CiborgError, CiborgValidator);

// registered routes
router.get('/games', webapi.getAllGames);
router.get('/games/:name', webapi.getGame);
router.post('/groups', webapi.createGroup);
router.put('/groups', webapi.updateGroup);
router.get('/groups', webapi.getAllGroups);
router.get('/groups/:id', webapi.getGroup);
router.put('/groups/games', webapi.addGameToGroup);
router.delete('/groups/games', webapi.removeGameFromGroup);
router.get('/groups/:id/games', webapi.getGamesFromGroup);

const config = {
    port: 9200,
}
const server = http.createServer(router);
server.listen(config.port);

describe('Router test:', function() {

    it('Error CiborgError 404', function(done) {
        let options = {
            url: 'http://localhost:9200/error',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('Command does not exist.', JSON.parse(rsp.body).payload.clientErrorMessage);
            done();            
        },() => {});
    });

    it('Should return getAllGames', function(done) {
        let options = {
            url: 'http://localhost:9200/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('getAllGames', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

    
    it('Should return getGame', function(done) {
        let options = {
            url: 'http://localhost:9200/games/:name',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('getGame', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return createGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.post(options,(err, rsp) => {
            assert.equal('createGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return updateGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(err, rsp) => {
            assert.equal('updateGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return getAllGroups', function(done) {
        let options = {
            url: 'http://localhost:9200/groups',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('getAllGroups', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return getGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('getGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {})
    });

    it('Should return addGameToGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.put(options,(err, rsp) => {
            assert.equal('addGameToGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

    it('Should return removeGameFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.delete(options,(err, rsp) => {
            assert.equal('removeGameFromGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

    it('Should return getGamesFromGroup', function(done) {
        let options = {
            url: 'http://localhost:9200/groups/:id/games',
            headers: { 'User-Agent': 'request'}
        };
        httpCall.get(options,(err, rsp) => {
            assert.equal('getGamesFromGroup', JSON.parse(rsp.body).payload);
            done();
        },() => {});
    });

});

setTimeout((function() {
    return process.exit();
}), 500);