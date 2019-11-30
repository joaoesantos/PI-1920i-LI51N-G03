let assert = require('assert');
let Props = require('../../libs/CIBORG/shared/Config')("../../libs/CIBORG/shared/files"); //../../libs/CIBORG/shared/files
let CiborgError = require('../../libs/CIBORG/errors/ciborg-error')
let gameDto = require('../../libs/CIBORG/entities/dtos/GameDto');
let game = require('../../libs/CIBORG/entities/models/Game');
let gameMapper = require('../../libs/CIBORG/entities/mappers/GameDtoMapper')(game);
let httpCallGetGameByID = require('./mocks/board-game-data/getGameByID-httpCall-mock');
let serviceGetGameByID = require('../../libs/CIBORG/dal/board-games-data')(Props, gameDto, gameMapper, httpCallGetGameByID, CiborgError);

let httpCallGetGameHttpCallError = require('./mocks/board-game-data/getGameByIDError-httpCall')(CiborgError);
let serviceGetGameByIDHttpCallError = require('../../libs/CIBORG/dal/board-games-data')(Props, gameDto, gameMapper, httpCallGetGameHttpCallError, CiborgError);

let httpCallGetGameByIDError = require('./mocks/board-game-data/getGameByIDError-dal');
let serviceGetGameByIDError = require('../../libs/CIBORG/dal/board-games-data')(Props, gameDto, gameMapper, httpCallGetGameByIDError, CiborgError);

let httpCallsearchByName = require('./mocks/board-game-data/searchByName-httpCall-mock');
let serviceSearchByName = require('../../libs/CIBORG/dal/board-games-data')(Props, gameDto, gameMapper, httpCallsearchByName, CiborgError);
let httpCallGetMostPopularGames = require('./mocks/board-game-data/getMostPopularGames-httpCall-mock');
let serviceGetMostPopularGames = require('../../libs/CIBORG/dal/board-games-data')(Props, gameDto, gameMapper, httpCallGetMostPopularGames, CiborgError);

describe('Service-games test:', function() {
  it('Should return game which name is Spirit Island', function(done) {
    let resp = serviceGetGameByID.getGameByID('kPDxpJZ8PD');

    resp.then((data) => {
      assert.equal("Spirit Island",data.body[0].name);
      done();
    });
    
  });

  it('Should return list of games with Monopoly in the name', function(done) {
    let resp = serviceSearchByName.searchByName("Monopoly");

    resp.then((data)=>{
      assert.notEqual(0,data.body.length);
      done();
    });
  });

  it('Should return a list with the 2 most popular games', function(done) {
    let resp = serviceGetMostPopularGames.getMostPopularGames();

    resp.then((data) =>{
      assert.equal(2, data.body.length);
      done();
    });
  });

  it('Should return a Ciborg Error from board-game-data dal', function(done) {
    let resp =  serviceGetGameByIDError.getGameByID('kPDxpJZ8PD');
    resp.then((data) => {
      throw new Error('Expected Error');
    })
    .catch((err) => {
      console.log(err);
      assert.ok(err instanceof CiborgError);
      assert.equal(err.message, 'Error calling external service: getGameByID.');
      done()
    })
    .catch(done);

  });

  it('Should return a Ciborg Error from http call', function(done) {
    let resp =  serviceGetGameByIDHttpCallError.getGameByID('kPDxpJZ8PD');
    resp.then((data) => {
      throw new Error('Expected Error');
    })
    .catch((err) => {
      console.log(err);
      assert.ok(err instanceof CiborgError);
      assert.equal(err.message, 'Error httpcall');
      done()
    })
    .catch(done);

  });

});
