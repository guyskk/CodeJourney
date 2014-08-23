var express = require("express");
var path = require("path");

// 导入自己的模块时，如果只写上目录名，将会尝试寻找目录中的index.js 如果没有找到，便失败
var routes = require('./routes/');


var app = express();

// 好像是
app.enable('trust proxy');

// set方法用于设定内部变量，use方法用于调用express的中间件

app.set("port", 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 设置渲染引擎
app.set('view engine', 'jade');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// 调用 routes
routes(app);



var server = app.listen(3000, function(req, res) {
    console.log('Listening on port %d', server.address().port);
});

