/*
 * GET home page.
 */
module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render('index', {
            title: 'Express'
        });
    });

    app.get("/socket", function(req, res) {
        res.render("socket",{
            title: "Socket"
        });
    });
}
