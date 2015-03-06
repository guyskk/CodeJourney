var express = require('express'),
	http = require('http'),
	route = require('./routes'),
	path = require('path'),
	swig = require('swig');


var app = express();
app.set('port', (process.env.PORT || 5000));

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//route
route(app);

// 开发模式
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// 路径解析
// app.get('/', route.index);
// app.get('/users', user.list);

// 启动及端口
app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});