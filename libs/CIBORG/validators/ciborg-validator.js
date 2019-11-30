'use strict';

const debug = require('debug')('validator');

let validator = function (CiborgError) {

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric,
        validateJson : validateJson,
        validateGroupWithNoIdFormat : validateGroupWithNoIdFormat,
        validateGroupFormat : validateGroupFormat
    };

    // Validates if data is a number
    function validateNumeric(data) {
        debug.extend('validateNumeric')('Validating...');
        if(isNaN(data)) {
            let err = new CiborgError(
                'Validation Error: '+ data + ' isNaN.',
                data + ' is not a number.',
                '400' // Bad Request
            );
            debug.extend('validateNumeric')('Validation Error: ' + data + ' isNaN.');
            return err;
        } else {
            debug.extend('validateNumeric')('Validation OK.');
            return null;
        } 
    };

    //Validates if data is an alphanumeric
    function validateAlfanumeric(data) {
        debug.extend('validateAlfanumeric')('Validating...');
        if (!data.match(/^[0-9a-zA-Z]+$/)) {
            let err = new CiborgError(
                'Validation Error: ' + data  + ' is not alphanumeric.',
                'Parameter is not alphanumeric',
                '400' // Bad Request
            );
            debug.extend('validateAlfanumeric')('Validation Error: ' + data  + ' is not alphanumeric.');
            return err;
        } else {
            debug.extend('validateAlfanumeric')('Validation OK.');
            return null;
        } 
    };

    // Validates if data is in json format
    function validateJson(data) {
        debug.extend('validateJson')('Validating...');
        try {
            JSON.parse(data);
        } catch (e) {
            let err = new CiborgError(
                'Validation Error: ' + data + ' is not in json format.',
                'Data is not in json format',
                '400' // Bad Request
            );
            debug.extend('validateNumeric')('Validation Error: ' + data + ' is not in json format.');
            return err;
        }
        debug.extend('validateJson')('Validation OK.');
        return null;
    };

    // Validates if group data is in right format for post command
    function validateGroupWithNoIdFormat(data) {
        debug.extend('validateGroupWithNoIdFormat')('Validating...');
        if(Object.keys(data).length != 3) {
            let err = new CiborgError(
                'Validation Error: invalid number of fields for post service.',
                'Failed to create group.',
                '400' // Bad Request
            );
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: invalid number of fields for post service.');
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Validation Error: group does not have a "name" field.',
                'Failed to create group, it does not have a "name" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "name" field.');
            return err;
        };
        if(!data.hasOwnProperty('description')) {
            let err = new CiborgError(
                'Validation Error: group does not have a "description" field.',
                'Failed to create group, it does not have a "description" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "description" field.');
            return err;
        };
        if(!data.hasOwnProperty('games')) {
            let err = new CiborgError(
                'Validation Error: group does not have a "games" field.',
                'Failed to create group, it does not have a "games" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupWithNoIdFormat')('Validation Error: group does not have a "description" field.');
            return err;
        };
        debug.extend('validateGroupWithNoIdFormat')('Validation OK.');
        return null;
    };

    // Validates if group data is in right format for put command
    function validateGroupFormat(data) {
        debug.extend('validateGroupFormat')('Validating...');
        if(!data.hasOwnProperty('id')) {
            let err = new CiborgError(
                'Validation Error: Group does not have "id" field.',
                'Group is missing "id" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupFormat')('Validation Error: Group does not have a "id" field.');
            return err;
        }
        if(Object.keys(data).length != 4) {
            let err = new CiborgError(
                'Validation Error: Group ' + data.id + ' has invalid number of fields for put service.',
                'Failed to create group.',
                '400' // Bad Request
            );
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' has invalid number of fields for put service.');
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Validation Error: Group ' + data.id + ' does not have "name" field.',
                'Failed to create group, missing "name" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' does not have "name" field.');
            return err;
        };
        if(!data.hasOwnProperty('description')) {
            let err = new CiborgError(
                'Validation Error: Group ' + data.id + 'does not have "description" field.',
                'Failed to create group, missing "description" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + 'does not have "description" field.');
            return err;
        };
        if(!data.hasOwnProperty('games')) {
            let err = new CiborgError(
                'Validation Error: Group ' + data.id + ' does not have a "games" field.',
                'Failed to create group, it does not have a "games" field.',
                '400' // Bad Request
            );
            debug.extend('validateGroupFormat')('Validation Error: Group ' + data.id + ' does not have a "games" field.');
            return err;
        } else {
            data.games.array.forEach(game => {
                validateGameFormat(game);
            });
        };
        debug.extend('validateGroupFormat')('Validation OK.');
        return null;
    };

    // Validates if game data is in right format for put command
    function validateGameFormat(data) {
        debug.extend('validateGameFormat')('Validating...');
        if(!data.hasOwnProperty('id')) {
            let err = new CiborgError(
                'Validation Error: Game does not have "id" field.',
                'Game does not have "id" field.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: game does not have a "id" field.');
            return err;
        };
        if(Object.keys(data).length != 4) {
            let err = new CiborgError(
                'Validation Error: Game ' + data.id + ' has invalid number of fields for put service in game',
                'Game ' + data.id + ' is not in correct format.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: invalid number of fields for put service ' + data.id + '.');
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Validation Error: Game ' + data.id + ' does not have "name" field.',
                'Game ' + data.id + ' does not have "name" field.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: game does not have a "name" field.');
            return err;
        };
        if(!data.hasOwnProperty('min_playtime')) {
            let err = new CiborgError(
                'Validation Error: Game ' + data.id + ' not have "min_playtime" field.',
                'Game ' + data.id + ' does not have "min_playtime" field.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: game does not have a "min_playtime" field.');
            return err;
        }
        if(!data.hasOwnProperty('max_playtime')) {
            let err = new CiborgError(
                'Validation Error: Game ' + data.id + ' does not have a "max_playtime" field.',
                'Game ' + data.id + ' does not have a "max_playtime" field.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: game does not have a "max_playtime" field.');
            return err;
        };
        if(min_playtime > max_playtime) {
            let err = new CiborgError(
                'Validation Error: Game ' + data.id + ' has min_playtime > max_playtime.',
                'Game ' + data.id + ' has min_playtime > max_playtime.',
                '400' // Bad Request
            );
            debug.extend('validateGameFormat')('Validation Error: Game ' + data.id + ' has min_playtime > max_playtime.');
            return err;
        };
        debug.extend('validateGameFormat')('Validation OK.');
        return null;
    };
}

module.exports = validator;