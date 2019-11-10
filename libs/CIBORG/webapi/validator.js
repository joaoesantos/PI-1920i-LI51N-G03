'use strict';

let validator = function (CiborgError) {

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
        if (!data.match(/^[0-9a-z]+$/)) {
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

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric,
        validateJson : validateJson
    };
}

module.exports = validator;