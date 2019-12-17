"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../spa/stylesheets/stylesheet.css');

const templates = require('./templateManager');
const img = require('./images/istockphoto.jpg').default;
//const bookImg = require('./img/books-1012088_640.jpg').default Quitela na gota!!

console.log(templates)
console.log("------------------------------")

document.body.innerHTML=templates.home(img);
window.addEventListener('hashchange', hashChangeHandler);
//hashChangeHandler();


function hashChangeHandler() {
    let gameTable = {
        header: ["H1", "H2", "H3"],
        elements: [
            {
                h1: "lala",
                p2: "lele",
                lge: "rbgegr"
            },
            {
                h1: "rrrrrrrrr",
                p2: "eeeeeeeeee",
                lge: "tttttttttt"
            }
        ]
    };
    document.body.innerHTML = templates.table(gameTable);
    //const mainContent = document.getElementById('mainContent')

    /*switch(window.location.hash){
        case '#home' :
            mainContent.innerHTML = templates.home({bookImg})
            break;
        case '#bundles' :
            mainContent.innerHTML = templates.bundles
            bundlesScript()
            break;
        default:
            window.location.hash="#home"
    }*/
	console.log("HASH CHANGED");

}