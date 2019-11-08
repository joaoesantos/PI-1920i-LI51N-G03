var assert = require('assert');
var gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
var game = require('../../libs/CIBORG/entities/models/Game');

console.log('game2', Object.keys(game(1,2,3,4)));

var gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
var httpCall = require('./httpCall-mock');
var service = require('../../libs/CIBORG/services/games/ciborg-services-games.js')(gameDto, gameMapper, httpCall);

describe('Service-games test:', function() {
  it('Should return game which name is Spirit Island', function(done) {
    service.getGameByID('kPDxpJZ8PD',function(res){
      assert.equal("Spirit Island",res.name);
      done();
    });
    
  });

  // it('Should return list of games with Monopoly in the name', function(done) {
  //   service.searchByName("Monopoly",function(res){
  //     console.log(res.length);
  //     assert.notEqual(0,res.name);
  //     done();
  //   });
    
  // });

});
