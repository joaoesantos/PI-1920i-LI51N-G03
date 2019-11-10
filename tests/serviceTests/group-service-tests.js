let assert = require('assert');
let gameService = require('./mocks/groups/gameServiceMock.js');

let CiborgError = require('../../libs/CIBORG/error/ciborg-error');

let props = require('../../libs/CIBORG/shared/Config')("../../libs/CIBORG/shared/files");

let group = require('../../libs/CIBORG/entities/models/Group');

describe('Service-groups tests:', function() {
  it('Should return list with 3 groups', function(done) {
    let groupsdHttpCall = require('./mocks/groups/getGroups-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, groupsdHttpCall, gameService, CiborgError);//tirar o null
    groupService.getAllGroups(function(err, res) {
      console.log(res)
      assert.equal(3,res.body.length);
      done();
    });
  });

  it('Should return a specific group:', function(done) {
    let groupByIdHttpCall = require('./mocks/groups/getGroupById-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, groupByIdHttpCall, gameService, CiborgError);//tirar o null
    groupService.getGroupById("A_lAR24BzWeGhLBFL1VJ",function(err, res) {
        assert.equal("A_lAR24BzWeGhLBFL1VJ",res.body.id);
        assert.equal("Test Group",res.body.name);
        assert.equal("Group of wild gamers",res.body.description);
        done();
    });
  });
    
  it('Should return the created group', function(done) {
    let createGroupHttpCall = require('./mocks/groups/createGroup-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, createGroupHttpCall, gameService, CiborgError);//tirar o null
    let group = {
      id : "BHCST24B48xg3O5S0PdP",
      name : 'Test Group',
      description : "Group of wild gamers",
      games : []
    }
    groupService.createGroup(group,function(err, res) {
        assert.equal("BHCST24B48xg3O5S0PdP",res.body.id);
        assert.equal("Test Group",res.body.name);
        assert.equal("Group of wild gamers",res.body.description);
        done();
    });
  });

  it('Should return the updated group', function(done) {
    let updateGroupHttpCall = require('./mocks/groups/updateGroup-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, updateGroupHttpCall, gameService, CiborgError);//tirar o null
    let group = {
      id : "BXCTT24B48xg3O5SuPev",
      name : 'Test Group',
      description : "Group of wild gamers",
      games : []
    };
    groupService.updateGroup(group,function(err, res) {
        assert.equal("BXCTT24B48xg3O5SuPev",res.body.id);
        assert.equal("Test Group",res.body.name);
        assert.equal("Group of wild gamers",res.body.description);
        done();
    });
  });

  it('Should return the list of games from group', function(done) {
    let getGroupByIdHttpCall = require('./mocks/groups/getGroupById-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, getGroupByIdHttpCall, gameService, CiborgError);//tirar o null
    let group = {
      id : "BXCTT24B48xg3O5SuPev",
      name : 'Test Group',
      description : "Group of wild gamers",
      games : [{
        id:"fG5Ax8PA7n",
        name:"Monopoly",
        min_playtime:90,
        max_playtime:120
    },
    {
        id:"levMwXaCM6",
        name:"Monopoly Deal Card Game",
        min_playtime:90,
        max_playtime:120
    }]
    };
    groupService.getGamesFromGroup(group,function(err, res) {
        assert.equal(2,res.body.length);
        assert.equal("fG5Ax8PA7n",res.body[0].id);
        assert.equal("levMwXaCM6",res.body[1].id);
        done();
    });
  });

  it('Should return the group with the added gamed', function(done) {
    let getGroupByIdHttpCall = require('./mocks/groups/getGroupById-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, getGroupByIdHttpCall, gameService, CiborgError);//tirar o null
    let group = {
      id : "A_lAR24BzWeGhLBFL1VJ",
      name : 'Test Group',
      description : "Group of wild gamers",
      games : [{
        id:"fG5Ax8PA7n",
        name:"Monopoly",
        min_playtime:90,
        max_playtime:120
    }]
    };
    groupService.addGameToGroup(group, "levMwXaCM6", function(err, res) {
        assert.equal("A_lAR24BzWeGhLBFL1VJ",res.body.id);
        assert.equal(2,res.body.games.length);
        assert.equal("fG5Ax8PA7n",res.body.games[0].id);
        assert.equal("levMwXaCM6",res.body.games[1].id);
        done();
    });
  });

  it('Should return the group with the removed gamed', function(done) {
    let getGroupByIdHttpCall = require('./mocks/groups/removeGameFromGroup-httpCall-mock');
    let groupService = require('../../libs/CIBORG/services/groups/ciborg-services-group')(props, getGroupByIdHttpCall, gameService, CiborgError);//tirar o null
    let group = {
      id : "A_lAR24BzWeGhLBFL1VJ",
      name : 'Test Group',
      description : "Group of wild gamers",
      games : [{
        id:"fG5Ax8PA7n",
        name:"Monopoly",
        min_playtime:90,
        max_playtime:120
    },
    {
      id:"levMwXaCM6",
      name:"Monopoly Deal Card Game",
      min_playtime:90,
      max_playtime:120
  }]
    };
    groupService.removeGameFromGroup(group, "levMwXaCM6", function(err, res) {
        assert.equal(Object.keys({}).length,Object.keys(res.body).length);
        done();
    });
  });
});