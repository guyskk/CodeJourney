/**
 * Created by CrispElite on 2015/1/18 0018.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

var counter = require('./util/counter.js');

console.log(counter.count());
console.log(counter.count());
console.log(counter.count());


function travel(dir, callback){
    fs.readdirSync(dir).forEach(function(file){
        var pathname = path.join(dir, file);
        if(fs.statSync(pathname).isDirectory()){
            travel(pathname, callback);
        }else{
            callback(pathname);
        }
    });
}

travel('E:\Code', function(pathname){
    console.log(pathname);
});


http.createServer(function(req, res){

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    var str = [];
    req.on('data', function(chunk){
        str.push(chunk);
    });

    req.on('end', function(){
        console.log(str);
        res.end(str.toString());
    });

}).listen(1234);


http.get('http://baidu.com', function(res){
    console.log('Get Baidu!!');
    console.log(res);
});

