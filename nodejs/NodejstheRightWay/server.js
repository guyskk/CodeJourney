var http = require("http"),
    path = require("path");

http.createServer(function(req, res){

    res.writeHead(200);
    res.end("Hello, Node!");
}).listen(1234);



