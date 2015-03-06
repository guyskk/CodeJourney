var express = require('express'),
    route = require('./routes'),
    path = require('path'),
    ejs = require('ejs');


var app = express();
app.set('port', (process.env.PORT || 5000));

app.engine('.html', ejs.__express);
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

// 启动及端口
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});