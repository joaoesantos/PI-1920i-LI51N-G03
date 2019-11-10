

let validator = function (CiborgError) {
    // Validates if a variable is a number
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

    //Validates if a variable is an alphanumeric
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

    return {
        validateNumeric : validateNumeric,
        validateAlfanumeric : validateAlfanumeric
    };
}

module.exports = validator;