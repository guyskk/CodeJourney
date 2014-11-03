var http =require("http"),
    path = require("path"),
    fs = require("fs");

var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg"
}


http.createServer(function(req, res){

    var filename = path.basename(req.url) || "index.html",
        ext = path.extname(filename),
        dir = path.dirname(req.url).substring(1),
        localPath = __dirname + "/public/";
        
    if(extensions[ext]){
        localPath += (dir ? dir + "/" : "") + filename;
        fs.exists(localPath, function(exists){
            if(exists){
                getFile(localPath, extensions[ext], res);
            }else{
                res.writeHead(404);
                res.end("Page is missing!!");
            }
        });
    }

}).listen(1234, "127.0.0.1");


function getFile(path, mimeType, res){
    fs.readFile(path, function(err, contents){
        if(!err){
            res.writeHead({
                "Content-Type":mimeType,
                "Content-Length": contents.length
            });
            res.end(contents);
        }else{
            res.writeHead(500);
            res.end("Server is missing!");
        }
    });
}


console.log("Server is running at: 127.0.0.1");

