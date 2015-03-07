var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var route = require('./routes');
var path = require('path');
var ejs = require('ejs');

route(app);

app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.set('port', (process.env.PORT || 5000));

// 启动及端口
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
