var http = require("http"),
    util = require("util"),
    path = require("path"),
    querystring = require("querystring"),
    stream = require('stream'),
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

function isEmpty(obj) {
    for (var name in obj) {
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

app.use(bodyParser.urlencoded({
        extended: false
    }))
    // parse application/json
app.use(bodyParser.json())




var requirejs = require("requirejs");

requirejs.config({
    nodeRequire: require
});

// sqlite3
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/douban.rdb', function(err){
    console.log(err);
    if(err === null){
        console.log("open successfully");    
    }
    
});

// mustache
var mu = require("mu2");
mu.root = __dirname + "/public/";




app.use('/edit', function(req, res) {

    var view = {
        pagetitle: "edit your profile",
        pageheader: "This page is perpare for everyone!",
    };

    var readable = mu.compileAndRender('edit.html', view);
    readable.pipe(res);


});

  
app.use("/api/users/edit", function(req, res) {
    mu.clearCache();
    res.writeHead({
        "Content-Type": "text/html"
    });
    if (req.method == "POST") {
        if (!req.body) {
            res.writeHead(400);
            res.end("Server is missing!");
        }
        var userName = {
            firstname: req.body.firstName,
            lastname: req.body.lastName
        };

        var readable = mu.compileAndRender('result.html', userName);
        readable.pipe(res);
    }

    if (req.method == "GET") {

        res.writeHead(200);
        res.end("Hey! Don't visit this page !");
    }
});


// use connect-route
var Route = require("connect-route");
var parentTmpl;

app.use(Route(function(router) {

    router.get('/', function(req, res, next) {
        res.end('index');
    });

    router.get('/movie', function(req, res, next){
        var html = "";
        var search = db.each("select * from MOVIE", function(err, row){
            console.log(row);
            var movie={
                name:row.name,
                href:row.href,
                img:row.post_url,
                type:row.type
            };
            var readable = mu.compileAndRender('movie.html', movie);
            readable.pipe(res);
        });
        res.end("movie");

    });

    router.get('/home', function(req, res, next) {
        res.end('home');
    });

    router.get('/home/:id', function(req, res, next) {
        res.end('home ' + req.params.id);
    });

    router.get("/show/:tmpl/:firstName/:lastName", function(req, res) {
        var userName = {
            firstName: req.params.firstName,
            lastName: req.params.lastName
        };
        // once the parent template is loaded, render the page
        requirejs(["text!templates/parent.html"], function(_parentTmpl) {
            parentTmpl = _parentTmpl;
            render(res, req.params.tmpl + ".html", userName);
        });
    });

    router.post('/home', function(req, res, next) {
        res.end('POST to home');
    });

    router.post("/theme", function(req, res, next) {
        var theme = {
            main: req.body.mainColor,
            secondary: req.body.secondaryColor,
            border: req.body.borderStyle,
            corners: req.body.borderRadius
        };
        // load and render the CSS template
        requirejs(["text!public/css/theme.css"], function(tmpl) {
            var css = mu.compileAndRender(tmpl, theme);
            res.writeHead(200, {
                "Content-Type": "text/css",
                "Content-Length": css.length
            });
            css.pipe(res);
        });
    });


}));








http.createServer(app).listen(3000);

function render(res, filename, data, style, script, callback) {
    // load the template and return control to another function or send the response
    requirejs(["text!templates/" + filename], function(tmpl) {
        if (callback) {
            callback(res, tmpl, data, style, script);
        } else {
            // render parent template with page template as a child
            var html = mu.render(parentTmpl, {content: data}, {
                    content: tmpl,
                    stylesheets: style || "",
                    scripts: script || ""
                }
            );
            console.log(html);
            html.pipe(res);
        }
    });
}


function getFile(path, mimeType, res) {
    fs.readFile(path, function(err, contents) {
        if (!err) {
            res.writeHead({
                "Content-Type": mimeType,
                "Content-Length": contents.length
            });
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end("Server is missing!");
        }
    });
}





console.log("Server is running at: 127.0.0.1");
