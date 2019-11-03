var assert = require('assert');
var service = require('../../libs/CIBORG/services/games/ciborg-services-games.js');

describe('Service-games test:', function() {
  it('Should return game which name is Spirit Island', function(done) {
    service.getGamesByGroupID('kPDxpJZ8PD',function(res){
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
