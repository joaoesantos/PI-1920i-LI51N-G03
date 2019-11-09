var assert = require('assert');
var gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
var game = require('../../libs/CIBORG/entities/models/Game');
var gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
var httpCall = require('./getGameByID-httpCall-mock');
var service = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCall);

describe('Service-games test:', function() {
  it('Should return game which name is Spirit Island', function(done) {
    service.getGameByID('kPDxpJZ8PD',function(res){
      assert.equal("Spirit Island",res.data.games[0].name);
      done();
    });
    
  });

  it('Should return list of games with Monopoly in the name', function(done) {
    service.searchByName("Monopoly",function(res){
      assert.notEqual(0,res.data.games.length);
      done();
    });
  });

  it('Should return a list with the 2 most popular games', function(done) {
    service.getMostPopularGames(2,function(res){
      assert.notEqual(2,res.data.games.length);
      done();
    });
  });

});
