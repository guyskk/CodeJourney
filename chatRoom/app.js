/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon()); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//返回 http.Server() 实例
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

var socket = require("socket.io"); //
var io = socket.listen(server); // 监听之前创建的 http.Server() 实例。返回一个io的实例


(function() {
    var userCount = 0,
        usersName = [];
    io.sockets.on('connection', function(socket) {
        userCount++;

        /* 用户
         *  设置昵称，更新在线用户列表
         */
        socket.on("setnickname", function(data, callback) {
            var name = data.nickname;
            if (usersName.indexOf(name) != -1) {
                callback(false);
            } else {
                callback(true);
                usersName.push(name);
                socket.name = name;
                socket.broadcast.emit("nickname list", usersName);
                socket.emit("nickname list", usersName);
            }
        });
        
        socket.emit("nickname list", usersName);
        socket.broadcast.emit("nickname list", usersName);

        //消息处理
        socket.on("user message", function(data) {
          socket.broadcast.emit("user message",{
            name : socket.name,
            message: data.message
          });
          socket.emit("user message",{
            name : socket.name,
            message: data.message
          });
        });


        //断开连接
        socket.on("disconnect", function() {
            //更新在线人数
            userCount--;
            if (!socket.name) {
                return false
            }
            console.log(usersName);
            var nameChecked = usersName.indexOf(socket.name);
            if (nameChecked > -1) {
                usersName.splice(nameChecked);
            }

        });
    });
})();
