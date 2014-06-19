(function() {
    console.log("Hello, music!!!");

    var tokenUrl = "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=1fb36946cd70f19cbcb9652f775c2620&format=json";

    var mplayers = {
        "ajax": {
            "getRequest": null
        }
    };

    mplayers.ajax.getRequest = function(url, callback) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
                callback(http.responseText);
            }
        };
        http.open("GET", url, false);
        http.send(null);

    };

    mplayers.ajax.getRequest(tokenUrl, function(data) {
        console.log("callback");
        console.log(data);
    });



})();
