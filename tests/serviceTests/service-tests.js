let assert = require('assert');
let gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
let game = require('../../libs/CIBORG/entities/models/Game');
let gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
let httpCallGetGameByID = require('./mocks/getGameByID-httpCall-mock');
let serviceGetGameByID = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCallGetGameByID);
let httpCallsearchByName = require('./mocks/searchByName-httpCall-mock');
let serviceSearchByName = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCallsearchByName);
let httpCallGetMostPopularGames = require('./mocks/getMostPopularGames-httpCall-mock');
let serviceGetMostPopularGames = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCallGetMostPopularGames);

describe('Service-games test:', function() {
  it('Should return game which name is Spirit Island', function(done) {
    serviceGetGameByID.getGameByID('kPDxpJZ8PD',function(err,res){
      assert.equal("Spirit Island",res.body.games[0].name);
      done();
    });
    
  });

  it('Should return list of games with Monopoly in the name', function(done) {
    serviceSearchByName.searchByName("Monopoly",function(err,res){
      assert.notEqual(0,res.body.games.length);
      done();
    });
  });

  it('Should return a list with the 100 most popular games', function(done) {
    serviceGetMostPopularGames.getMostPopularGames(function(err,res){
      assert.equal(100,res.body.games.length);
      done();
    });
  });

  it('Should return an error', function(done) {
    serviceGetMostPopularGames.getMostPopularGames(2,function(err,res){
      assert.notEqual(null,err);
      done();
    });
  });

});
