var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");
var cache={};

http.createServer(function(req,res){
    res.writeHead(200,{
      "Content-Type":"text/plain"
    });
res.write("Hello!");
}).listen(3000,function(){
  console.log("Server is started! port:3000");
});
