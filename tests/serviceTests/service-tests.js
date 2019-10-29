var assert = require('assert');
var service = require('../../libs/CIBORG/services/games/ciborg-services-games.js');

describe('Service-games test:', function() {
  it('Should return game which name is Game1', function(done) {
    service.getGamesByGroupID(1,function(res){
      assert.equal("Game1",res.name);
      done();
    });
    
  });

  it('Should return game which name is Game1', function(done) {
    service.searchByName("Monopoly",function(res){
      assert.notEqual(0,res.name);
      done();
    });
    
  });

});
