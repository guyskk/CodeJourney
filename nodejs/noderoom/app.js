var express = require('express'),
    route = require('./routes'),
    path = require('path'),
    ejs = require('ejs'),
    jade = require('jade');

// connect

var errorHandler = require('errorHandler');


var app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var socketService = require('./services/socket.service')(io);

socketService.init();


/** @namespace process.env.PORT */
app.set('port', (process.env.PORT || 5000));

//app.engine('.html', jade.__express);
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './static')));

//route
route(app);

// 开发模式
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// 启动及端口 监听http 而不是app
http.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});



