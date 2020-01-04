'use strict';

const debug = require('debug')('validator');

let validator = function (CiborgError) {

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric,
        validateJson : validateJson,
        validateGroupWithNoIdFormat : validateGroupWithNoIdFormat,
        validateGroupFormat : validateGroupFormat,
        validateGroupOwner : validateGroupOwner
    };

    // Validates if data is a number
    function validateNumeric(data) {
        debug.extend('validateNumeric')('Validating...');
        if(isNaN(data)) {
            debug.extend('validateNumeric')('Validation Error: ' + data + ' isNaN.');
            throw new CiborgError(null,
                'Validation Error: '+ data + ' isNaN.',
                data + ' is not a number.',
                '400' // Bad Request
            );
        } else {
            debug.extend('validateNumeric')('Validation OK.');
        } 
    };

    //Validates if data is an alphanumeric
    function validateAlfanumeric(data) {
        debug.extend('validateAlfanumeric')('Validating...');
        if (!data.match(/^[0-9a-zA-Z]+$/)) {
            debug.extend('validateAlfanumeric')('Validation Error: ' + data  + ' is not alphanumeric.');
            throw new CiborgError(null,
                'Validation Error: ' + data  + ' is not alphanumeric.',
                'Parameter is not alphanumeric',
                '400' // Bad Request
            );
        } else {
            debug.extend('validateAlfanumeric')('Validation OK.');
        } 
    };

    // Validates if data is in json format
    function validateJson(data) {
        debug.extend('validateJson')('Validating...');
        try {
            JSON.parse(data);
        } catch (e) {
            debug.extend('validateNumeric')('Validation Error: ' + data + ' is not in json format.');
            throw new CiborgError(null,
                'Validation Error: ' + data + ' is not in json format.',
                'Data is not in json format',
                '400' // Bad Request
            );
            
        }
        debug.extend('validateJson')('Validation OK.');
    };

    // Validates if game data is in right format for put command
    function validateGameFormat(data) {
        debug.extend('validateGameFormat')('Validating...');
        if(!data.hasOwnProperty('id')) {
            debug.extend('validateGameFormat')('Validation Error: game does not have a "id" field.');
            throw new CiborgError(null, 
                'Validation Error: Game does not have "id" field.',
                'Game does not have "id" field.',
                '400' // Bad Request
            );            
        };
        if(!data.hasOwnProperty('name')) {
            debug.extend('validateGameFormat')('Validation Error: game does not have a "name" field.');
            throw new CiborgError(null,
                'Validation Error: Game ' + data.id + ' does not have "name" field.',
                'Game ' + data.id + ' does not have "name" field.',
                '400' // Bad Request
            );            
        };
        if(!data.hasOwnProperty('min_playtime')) {
            debug.extend('validateGameFormat')('Validation Error: game does not have a "min_playtime" field.');
            throw new CiborgError(null,
                'Validation Error: Game ' + data.id + ' not have "min_playtime" field.',
                'Game ' + data.id + ' does not have "min_playtime" field.',
                '400' // Bad Request
            );
        }
        if(!data.hasOwnProperty('max_playtime')) {
            debug.extend('validateGameFormat')('Validation Error: game does not have a "max_playtime" field.');
            throw new CiborgError(null,
                'Validation Error: Game ' + data.id + ' does not have a "max_playtime" field.',
                'Game ' + data.id + ' does not have a "max_playtime" field.',
                '400' // Bad Request
            );
        };
        if(data.min_playtime > data.max_playtime) {
            debug.extend('validateGameFormat')('Validation Error: Game ' + data.id + ' has min_playtime > max_playtime.');
            throw new CiborgError(null,
                'Validation Error: Game ' + data.id + ' has min_playtime > max_playtime.',
                'Game ' + data.id + ' has min_playtime > max_playtime.',
                '400' // Bad Request
            );
        };
        if(Object.keys(data).length != 4) {
            debug.extend('validateGameFormat')('Validation Error: invalid number of fields for put service ' + data.id + '.');
            throw new CiborgError(null,
                'Validation Error: Game ' + data.id + ' has invalid number of fields for put service in game',
                'Game ' + data.id + ' is not in correct format.',
                '400' // Bad Request
            );            
        };
        debug.extend('validateGameFormat')('Validation OK.');
    };

    // Validates if group data is in right format for post command
    function validateGroupWithNoIdFormat(data) {
        debug.extend('validateGroupWithNoIdFormat')('Validating...');
        if(!data.hasOwnProperty('name')) {
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "name" field.');
            throw new CiborgError(null,
                'Validation Error: group does not have a "name" field.',
                'Failed to create group, it does not have a "name" field.',
                '400' // Bad Request
            );
        };
        if(!data.hasOwnProperty('description')) {
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "description" field.');
            throw new CiborgError(null,
                'Validation Error: group does not have a "description" field.',
                'Failed to create group, it does not have a "description" field.',
                '400' // Bad Request
            );
        };
        if(!data.hasOwnProperty('games')) {
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "description" field.');
            throw new CiborgError(null,
                'Validation Error: group does not have a "games" field.',
                'Failed to create group, it does not have a "games" field.',
                '400' // Bad Request
            );
        } else {
            data.games.forEach(game => {
                validateGameFormat(game);
            });
        };
        if(Object.keys(data).length != 3) {
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: invalid number of fields for post service.');
            throw new CiborgError(null,
                'Validation Error: invalid number of fields for post service.',
                'Failed to create group.',
                '400' // Bad Request
            );
        };
        debug.extend('validateGroupWithNoIdFormat')('Validation OK.');
    };

    // Validates if group data is in right format for put command
    function validateGroupFormat(data) {
        debug.extend('validateGroupFormat')('Validating...');
        if(!data.hasOwnProperty('id')) {
            debug.extend('validateGroupFormat')('Validation Error: Group does not have a "id" field.');
            throw new CiborgError(null,
                'Validation Error: Group does not have "id" field.',
                'Group is missing "id" field.',
                '400' // Bad Request
            );
        }
        if(!data.hasOwnProperty('name')) {
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' does not have "name" field.');
            throw new CiborgError(null,
                'Validation Error: Group ' + data.id + ' does not have "name" field.',
                'Failed to create group, missing "name" field.',
                '400' // Bad Request
            );
        };
        if(!data.hasOwnProperty('description')) {
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + 'does not have "description" field.');
            throw new CiborgError(null,
                'Validation Error: Group ' + data.id + 'does not have "description" field.',
                'Failed to create group, missing "description" field.',
                '400' // Bad Request
            );
        };
        if(!data.hasOwnProperty('games')) {
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' does not have a "games" field.');
            throw new CiborgError(null,
                'Validation Error: Group ' + data.id + ' does not have a "games" field.',
                'Failed to create group, it does not have a "games" field.',
                '400' // Bad Request
            );
        } else {
            data.games.forEach(game => {
                validateGameFormat(game);
            });
        };
        if(Object.keys(data).length != 4) {
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' has invalid number of fields for put service.');
            throw new CiborgError(null,
                'Validation Error: Group ' + data.id + ' has invalid number of fields for put service.',
                'Failed to create group.',
                '400' // Bad Request
            );
        };
        debug.extend('validateGroupFormat')('Validation OK.');
    };

    // Validates if the session-owner has acess to requested group information
    function validateGroupOwner(owner, group) {
        debug.extend('validateNumeric')('Validating...');
        if(owner !== group.owner) {
            debug.extend('validateGroupOwner')('Validation Error: ' + owner + ' is not the group owner.');
            throw new CiborgError(null,
                'Validation Error: Unauthorized access' + owner + ' is not the group owner.',
                'Unauthorized access, failed to get group',
                '401' // Unauthorized
            );
        } else {
            debug.extend('validateGroupOwner')('Validation OK.');
        } 
    };

}

module.exports = validator;