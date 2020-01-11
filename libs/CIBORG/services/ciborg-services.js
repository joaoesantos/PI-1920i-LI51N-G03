'use strict';

let ciborgServices = function(CiborgError, gamesService, groupsService, userService) {
    let services = {
        games: gamesService,

        groups: {
            getAllGroups: async(userId) => {
                let data = await groupsService.getAllGroups();
                data.body = data.body.filter(group => group.owner === userId);
                return data;
            },

            getGroupById: async(userId, groupId) => {
                let data = await groupsService.getGroupById(groupId);
                if (userId !== data.body.owner) {
                    throw new CiborgError(null,
                        'Validation Error: Forbidden access ' + userId + ' is not the group owner.',
                        'Unauthorized access, failed to get group',
                        '403' // Forbidden
                    );
                }
                return data;
            },

            createGroup: groupsService.createGroup,

            updateGroup: async(userId, group) => {
                let data = await groupsService.getGroupById(group.id);
                if (userId !== data.body.owner) {
                    throw new CiborgError(null,
                        'Validation Error: Forbidden access ' + userId + ' is not the group owner.',
                        'Unauthorized access, failed to update group',
                        '403' // Forbidden
                    );
                }
                return await groupsService.updateGroup(group);
            },

            getGamesFromGroup: async(userId, groupId) => {
                let data = await groupsService.getGroupById(groupId);
                if (userId !== data.body.owner) {
                    throw new CiborgError(null,
                        'Validation Error: Forbidden access ' + userId + ' is not the group owner.',
                        'Unauthorized access, failed to get games from group',
                        '403' // Forbidden
                    );
                }
                return await groupsService.getGamesFromGroup(groupId);
            },

            addGameToGroup: async(userId, groupId, gameId) => {
                let data = await groupsService.getGroupById(groupId);
                if (userId !== data.body.owner) {
                    throw new CiborgError(null,
                        'Validation Error: Forbidden access ' + userId + ' is not the group owner.',
                        'Unauthorized access, failed to add game to group',
                        '403' // Forbidden
                    );
                }
                return await groupsService.addGameToGroup(groupId, gameId);
            },

            removeGameFromGroup: async(userId, groupId, gameId) => {
                let data = await groupsService.getGroupById(groupId);
                if (userId !== data.body.owner) {
                    throw new CiborgError(null,
                        'Validation Error: Forbidden access ' + userId + ' is not the group owner.',
                        'Unauthorized access, failed to remove game from group',
                        '403' // Forbidden
                    );
                }
                return await groupsService.removeGameFromGroup(groupId, gameId);
            }
        },

        users: userService
        
    };
    return services;
};

module.exports = ciborgServices;