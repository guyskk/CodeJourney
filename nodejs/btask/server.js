/**
 * Created by CrispElite on 2015/2/12 0012.
 */

var connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    app;

app = connect();
app.use(serveStatic('app'));
app.use('/js/lib/', serveStatic('node_modules/requirejs/'));
app.use('/node_modules', serveStatic('node_modules'));
app.use('/test', serveStatic('test/'));
app.use('/test', serveStatic('app'));

http.createServer(app).listen(8080, function(){
    console.log('Running on http://localhost:8080!');
});



