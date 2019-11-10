let assert = require('assert');
let CiborgError = require('../../libs/CIBORG/errors/ciborg-error')
let gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
let game = require('../../libs/CIBORG/entities/models/Game');
let gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
let httpCallGetGameByID = require('./mocks/board-game-data/getGameByID-httpCall-mock');
let serviceGetGameByID = require('../../libs/CIBORG/dal/board-games-data')(gameDto, gameMapper, httpCallGetGameByID, CiborgError);
let httpCallGetGameByIDError = require('./mocks/board-game-data/getGameByIDError-httpCall');
let serviceGetGameByIDError = require('../../libs/CIBORG/dal/board-games-data')(gameDto, gameMapper, httpCallGetGameByIDError, CiborgError);
let httpCallsearchByName = require('./mocks/board-game-data/searchByName-httpCall-mock');
let serviceSearchByName = require('../../libs/CIBORG/dal/board-games-data')(gameDto, gameMapper, httpCallsearchByName, CiborgError);
let httpCallGetMostPopularGames = require('./mocks/board-game-data/getMostPopularGames-httpCall-mock');
let serviceGetMostPopularGames = require('../../libs/CIBORG/dal/board-games-data')(gameDto, gameMapper, httpCallGetMostPopularGames, CiborgError);

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

  it('Should return a list with the 2 most popular games', function(done) {
    serviceGetMostPopularGames.getMostPopularGames(function(err,res){
      assert.equal(2,res.body.games.length);
      done();
    });
  });

  it('Should return an error', function(done) {
    serviceGetGameByIDError.getGameByID('kPDxpJZ8PD',function(err,res){
      assert.notEqual(null,err);
      done();
    });
  });

});
