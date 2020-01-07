'use strict';

module.exports = {
    //login: login,
    logout: logout
};

function AuthenticationApiUris() {
    const baseUri = 'http://localhost:8500/';

    this.loginUri = () => `${baseUri}login`;
    this.logoutUri = () => `${baseUri}logout`;
};

const Uris = new AuthenticationApiUris();

function login(){ };

function logout(){
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    return fetch(Uris.logoutUri(), options)
        .then((rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                //avisa o user que deu merda
                //throw new Error();
            }
        })
        .catch((err) => {
            //send error message
        });
};