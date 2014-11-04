var http = require("http"),
    util = require("util"),
    path = require("path"),
    querystring = require("querystring"),
    stream = require('stream');
    fs = require("fs"),
    connect = require("connect");

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

// http.createServer(function(req, res){

//     var qs = querystring.parse(req.url.split("?")[1]);

//         // property names are the same as in the querystring
//         // userName = qs.firstName + " " + qs.lastName;


//     var filename = path.basename(req.url) || "index.html",
//         ext = path.extname(filename),
//         dir = path.dirname(req.url).substring(1),
//         localPath = __dirname + "/public/";

//     if(!isEmpty(qs)){
//         userName = qs.username;
//         html = "<!doctype html>" +
//                 "<html><head><title>Hello " + userName + "</title></head>" +
//                 "<body><h1>Hello, " + userName + "!</h1></body></html>";
//         res.end(html);
//     }
//     if(extensions[ext]){
//         console.log("file");
//         localPath += (dir ? dir + "/" : "") + filename;
//         fs.exists(localPath, function(exists){
//             if(exists){
//                 getFile(localPath, extensions[ext], res);
//             }else{
//                 res.writeHead(404);
//                 res.end("Page is missing!!");
//             }
//         });
//     }


// }).listen(1234, "127.0.0.1");

var app = connect();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var mu = require("mu2");
mu.root = __dirname + "/public/";

app.use('/edit', function(req, res){
    var userName = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    var template = "",
        html;

    var readable = mu.compileAndRender('edit.html', userName);
    
    readable.pipe(res);
    readable.on("data", function(data) {
        template += data;
        console.log(">>>>>templates");
    });
    readable.on("end", function() {
    // render the template with the userName object as data
        html = mu.renderText("123ewr4", userName);
        res.end(html);
    });
});

app.use("/api/users/edit", function(req, res){
    res.writeHead({
        "Content-Type":"text/html"
    });
    if(req.method == "POST"){
        console.log(req);
        if (!req.body){
            res.writeHead(400);
            res.end("Server is missing!");
        }
        var resultfile = __dirname + "/public/result.html";
        fs.exists(resultfile, function(exists){
            if(exists){
                getFile(resultfile, extensions["html"], res);
            }else{
                res.writeHead(404);
                res.end("Page is missing!!");
            }
        });
    }

    if(req.method == "GET"){

        res.writeHead(200);
        res.end("Hey! Don't visit this page !");   
    }
});

http.createServer(app).listen(3000);

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

