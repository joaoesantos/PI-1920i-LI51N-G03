"use script";

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')

const templates = require('./templateBuilder');
//const bookImg = require('./img/books-1012088_640.jpg').default Quitela na gota!!

document.body.innerHTML=templates.home
window.addEventListener('hashchange', hashChangeHandler)
hashChangeHandler()


function hashChangeHandler(){

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