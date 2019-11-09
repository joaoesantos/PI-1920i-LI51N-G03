let assert = require('assert');
let gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
let game = require('../../libs/CIBORG/entities/models/Game');
let gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
let httpCallGetGameByID = require('./getGameByID-httpCall-mock');
let serviceGetGameByID = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCallGetGameByID);
let httpCallsearchByName = require('./searchByName-httpCall-mock');
let serviceSearchByName = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCallsearchByName);
let httpCallGetMostPopularGames = require('./getMostPopularGames-httpCall-mock');
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

  it('Should return a list with the 2 most popular games', function(done) {
    serviceGetMostPopularGames.getMostPopularGames(2,function(err,res){
      assert.equal(2,res.body.games.length);
      done();
    });
  });

});
