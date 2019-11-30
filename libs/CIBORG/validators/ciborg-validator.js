'use strict';

let validator = function (CiborgError) {

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric,
        validateJson : validateJson,
        validateCreateGroupFormat : validateCreateGroupFormat,
        validateUpdateGroupFormat : validateUpdateGroupFormat,
        validateAddGameToGroupFormat : validateAddGameToGroupFormat,
        validateRemoveGameFromGroupFormat : validateRemoveGameFromGroupFormat
    };

    // Validates if data is a number
    function validateNumeric(data) {
        if(isNaN(data)) {
            let err = new CiborgError(
                'Error in validator: ' + data + ' isNaN.',
                data + ' is not a number.',
                '400' // Bad Request
            );
            return err;
        } else {
            return null;
        } 
    };

    //Validates if data is an alphanumeric
    function validateAlfanumeric(data) {
        if (!data.match(/^[0-9a-zA-Z]+$/)) {
            let err = new CiborgError(
                'Error in validator:  ' + data + ' is not alphanumeric.',
                'Parameter is not alphanumeric',
                '400' // Bad Request
            );
            return err;
        } else {
            return null;
        } 
    };

    // Validates if data is in json format
    function validateJson(data) {
        try {
            JSON.parse(data);
        } catch (e) {
            let err = new CiborgError(
                'Error in validator:  ' + data + ' is not json.',
                'Data is not in json format',
                '400' // Bad Request
            );
            return err;
        }
        return null;
    }

    // Validates if group data is in right format for post command
    function validateGroupWithNoIdFormat(data) {
        console.log("number of cenas" + Object.keys(data));
        if(Object.keys(data).length != 2) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for post service.',
                'Failed to create group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Error in validator: group does not have a "name" field.',
                'Failed to create group, it does not have a "name" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('description')) {
            let err = new CiborgError(
                'Error in validator: group does not have a "description" field.',
                'Failed to create group, it does not have a "description" field.',
                '400' // Bad Request
            );
            return err;
        };
        return null;
    }

    // Validates if group data is in right format for put command
    function validateUpdateGroupFormat(data) {
        if(Object.keys(data).length != 3) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for put service.',
                'Failed to create group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Error in validator: group does not have "name" field.',
                'Failed to create group, missing "name" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('description')) {
            let err = new CiborgError(
                'Error in validator: group does not have "description" field.',
                'Failed to create group, missing "description" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('id')) {
            let err = new CiborgError(
                'Error in validator: group does not have "id" field.',
                'Failed to create group, missing "id" field.',
                '400' // Bad Request
            );
            return err;
        }
        return validateAlfanumeric(data.id);
    }

    // Validates if group data is in right format for post command
    function validateAddGameToGroupFormat(data) {
        if(Object.keys(data).length != 2) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for update.',
                'Failed to update group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('gameName')) {
            let err = new CiborgError(
                'Error in validator: data does not have "gameName" field.',
                'Failed to update group, missing "gameName" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('groupId')) {
            let err = new CiborgError(
                'Error in validator: data does not have "groupId" field.',
                'Failed to create group, missing "groupId" field.',
                '400' // Bad Request
            );
            return err;
        };
        return validateAlfanumeric(data.groupId);
    }

    // Validates if group data is in right format for post command
    function validateRemoveGameFromGroupFormat(data) {
        if(Object.keys(data).length != 2) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for delete.',
                'Failed to delete group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('gameName')) {
            let err = new CiborgError(
                'Error in validator: data does not have "gameName" field.',
                'Failed to delete group, missing "gameName" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('groupId')) {
            let err = new CiborgError(
                'Error in validator: data does not have "groupId" field.',
                'Failed to delete group, missing "groupId" field.',
                '400' // Bad Request
            );
            return err;
        };
        return validateAlfanumeric(data.groupId);
    }

}

module.exports = validator;