"use strict";

let path = require('path');
let fs = require('fs');

let configFile ={};

function loadConfigFiles(dir, filelist) {
    let files = fs.readdirSync(dir); // Synchronously read all files in the next directory, if there are no more, null will be returned
    filelist = filelist || [];
    files.forEach(function(file) {
        if(fs.statSync(path.join(dir,file)).isDirectory()) {
            filelist = loadConfigFiles(path.join(dir,file),filelist); // enter new directory
        } else { // add new json object to configFile output
            let name = path.parse(file).name;
            const jsonString  = fs.readFileSync(path.join(dir,file));
            configFile[name] = JSON.parse(jsonString);
        }
    });
}

loadConfigFiles(path.basename("./files"));
module.exports = configFile;