'use strict';

let defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
defaultHeaders.append("Accept", "application/json");

module.exports = {
    defaultHeaders: defaultHeaders,
    apiBaseUrl: "http://localhost:8500"
};