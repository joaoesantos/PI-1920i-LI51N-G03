'use strict';

const clientSideConfigs = require("../clientSideConfigs");

module.exports = {
    login: login,
    logout: logout
};

function AuthenticationApiUris() {
    const baseUri = clientSideConfigs.apiBaseUrl;

    this.loginUri = () => `${baseUri}/login`;
    this.logoutUri = () => `${baseUri}/logout`;
};

const Uris = new AuthenticationApiUris();

function login(userId, password) {
    const options = {
        method: "POST",
        headers: clientSideConfigs.defaultHeaders,
        body: JSON.stringify({
            userId: userId,
            password: password
        })
    };
    return fetch(Uris.loginUri(), options)
        .then(async(rsp) => {
            console.log(rsp)
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        });

};

function logout() {
    const options = {
        method: "DELETE",
        headers: clientSideConfigs.defaultHeaders
    };
    return fetch(Uris.logoutUri(), options)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                throw new Error(response.payload.clientErrorMessage);
            }
        })
};