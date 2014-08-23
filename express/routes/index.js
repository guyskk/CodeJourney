
module.exports = function(app) {

    /* GET home page. */
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Express'
        });
    });
    /* GET about page */
    app.get('/about', function(req, res) {
        res.render('about', {
            title: 'About'
        });
    });

};
