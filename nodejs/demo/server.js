var http =require("http"),
    path = require("path"),
    querystring = require("querystring"),
    fs = require("fs");

var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg"
}

function isEmpty(obj){
    for (var name in obj) 
    {
        return false;
    }
    return true;
}

http.createServer(function(req, res){

    var qs = querystring.parse(req.url.split("?")[1]);

        // property names are the same as in the querystring
        // userName = qs.firstName + " " + qs.lastName;


    var filename = path.basename(req.url) || "index.html",
        ext = path.extname(filename),
        dir = path.dirname(req.url).substring(1),
        localPath = __dirname + "/public/";

    if(!isEmpty(qs)){
        userName = qs.username;
        html = "<!doctype html>" +
                "<html><head><title>Hello " + userName + "</title></head>" +
                "<body><h1>Hello, " + userName + "!</h1></body></html>";
        res.end(html);
    }
    if(extensions[ext]){
        console.log("file");
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

