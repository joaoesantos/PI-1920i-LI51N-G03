const http = require('http')

const server = http.createServer(processRequest)
server.listen('8080', () => console.log("listening"))

function processRequest(req, res){
    console.log(req.method)
    console.log(req.url)
    console.log(req.headers)
    
    res.setHeader("Content-Type", "application/json");
    //res.write("Hello world")
    //res.end();
    //res.end("Hello world");
    res.end(JSON.stringify({name: "book1"}));
}