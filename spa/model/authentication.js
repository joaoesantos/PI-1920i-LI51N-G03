'use strict';

const clientSideConfigs = require("../clientSideConfigs");

module.exports = {
    signIn: signIn,
    login: login,
    isLoggedIn: isLoggedIn,
    logout: logout
};

function AuthenticationApiUris() {
    const baseUri = clientSideConfigs.apiBaseUrl;

    this.signInUri = () => `${baseUri}/signIn`;
    this.loginUri = () => `${baseUri}/login`;
    this.logoutUri = () => `${baseUri}/logout`;
};

const Uris = new AuthenticationApiUris();

function signIn(userId, name, password) {
    const options = {
        method: "POST",
        headers: clientSideConfigs.defaultHeaders,
        body: JSON.stringify({
            userId: userId,
            name: name,
            password: password
        })
    };
    return fetch(Uris.signInUri(), options)
        .then(async(rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                let err = new Error(response.payload.clientErrorMessage);
                err.statusCode = rsp.status;
                throw err;
            }
        });
};

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
            if (rsp.ok) {
                return rsp.json();
            } else {
                let response = await rsp.json();
                let err = new Error(response.payload.clientErrorMessage);
                err.statusCode = rsp.status;
                throw err;
            }
        });
};

function isLoggedIn() {
    const options = {
        method: "POST",
        headers: clientSideConfigs.defaultHeaders,
        body: JSON.stringify({ userId: "", password: "" })
    };
    return fetch(Uris.loginUri(), options)
        .then(async(rsp) => rsp.status === 403);
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
                let err = new Error(response.payload.clientErrorMessage);
                err.statusCode = rsp.status;
                throw err;
            }
        })
};