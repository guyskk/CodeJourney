module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });
    app.get('/demo', function(req, res){
        res.render('demo');
    });

    app.get('/signin', function(req, res){
        res.render('signIn');
    })
};
