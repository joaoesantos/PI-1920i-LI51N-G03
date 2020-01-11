'use strict';

let securityUtils = function(Props, CiborgError, bcrypt) {

    return {
        hashPassword: hashPassword
    };

    async function hashPassword(password) {
        let salt = await bcrypt.genSalt(Props.security.salt);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    };
};

module.exports = securityUtils;