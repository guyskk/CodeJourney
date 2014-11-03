var http =require("http"),
    path = require("path"),
    fs = require("fs");

var html = "<!doctype html>" +
            "<html><head><title>Hello world</title></head>" +
            "<body><h1>Hello, world!</h1></body></html>";

http.createServer(function(req, res){

    var filename = path.basename(req.url),
        ext = path.extname(filename),
        localPath = __dirname + "/public/";

    if(ext == "html"){
        localPath += filename;
        path.exists(localPath, function(exists){
            if(exists){
                getFile(localPath, res);
            }else{
                res.writeHead(404);
                res.end();
            }
        });   
    }
    
}).listen(1337, "127.0.0.1");

console.log("Server is running at: 127.0.0.1");

