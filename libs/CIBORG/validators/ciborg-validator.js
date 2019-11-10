'use strict';

let validator = function (CiborgError) {

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric,
        validateJson : validateJson,
        validateGroupPostFormat : validateGroupPostFormat,
        validateGroupPutFormat : validateGroupPutFormat,
        validateGroupGamePutFormat : validateGroupGamePutFormat,
        validateGroupGameDeleteFormat : validateGroupGameDeleteFormat
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
    function validateGroupPostFormat(data) {
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
        function validateGroupPutFormat(data) {
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
            return null;
    }

    // Validates if group data is in right format for post command
    function validateGroupGamePutFormat(data) {
        if(Object.keys(data).length != 2) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for update.',
                'Failed to update group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Error in validator: data does not have "name" field.',
                'Failed to update group, missing "name" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('id')) {
            let err = new CiborgError(
                'Error in validator: data does not have "id" field.',
                'Failed to create group, missing "id" field.',
                '400' // Bad Request
            );
            return err;
        };
        return null;
    }

    // Validates if group data is in right format for post command
    function validateGroupGameDeleteFormat(data) {
        if(Object.keys(data).length != 2) {
            let err = new CiborgError(
                'Error in validator: invalid number of fields for delete.',
                'Failed to delete group.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('name')) {
            let err = new CiborgError(
                'Error in validator: data does not have "name" field.',
                'Failed to delete group, missing "name" field.',
                '400' // Bad Request
            );
            return err;
        };
        if(!data.hasOwnProperty('id')) {
            let err = new CiborgError(
                'Error in validator: data does not have "id" field.',
                'Failed to delete group, missing "id" field.',
                '400' // Bad Request
            );
            return err;
        };
        return null;
    }

}

module.exports = validator;