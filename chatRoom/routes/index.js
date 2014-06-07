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

    app.get("/users",function(req,res){
        
        console.log("res\n\n\n\n");
        console.log(res);
        console.log("\n\n\n\nres");
        var username=queryString(req.url);
        res.render("users",{
            title:username
        });
    });
}

function queryString(url){
    var paras=[];
    var url=url.substring(url.indexOf("?")+1);
    return url;
}
