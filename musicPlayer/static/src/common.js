var mplayers = {
    "ajax": {
        "getRequest": null
    }
};
var CONFIG = {
    "url": {
        "users": "http://fm.baidu.com/dev/api/?tn=usercounts&_=1403397847605",
        "postUrl": "http://fm.baidu.com/dev/api/?action=userop&tn=userop&_=",
        "playlist": "http://fm.baidu.com/dev/api/?tn=playlist&id=public_yuzhong_huayu&special=flash&prepend=&format=json&_=1403362900890",
        "songlink": "http://music.baidu.com/data/music/fmlink?type=mp3&rate=128&callback=jsonpGetSongList&songIds="
    }
};

mplayers.ajax.getRequest = function(url, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    };
    http.open("GET", url, false);
    http.send(null);

};
mplayers.ajax.postRequest = function(url, para, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    };
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "applicaiotn/x-www-form-urlencoded");
    http.send(para);

};

mplayers.addScript = function(url, callback) {
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0];
    script.onload = function() {
        callback();
    };
    head.appendChild(script);
    script.src = url;
};
mplayers.getTime = function() {
    var date = new Date();
    return date.getTime();
};

function jsonpGetSongList(data) {
    console.log(data);
    var songList = data.data.songList;
    for (var i = 0, len = songList.length; i < len; i++) {
        SONGLIST[i] = songList[i];
    }
}


// mplayers.ajax.getRequest("php/proxy.php?url=" + CONFIG.url.users, function(data) {
//     console.log("users callback");
// });

// mplayers.ajax.getRequest("php/proxy.php?url=" + CONFIG.url.playlist, function(data) {
//     console.log("playlist callback");
//     data = JSON.parse(data);
//     var list = data.list;
//     for (var i = list.length - 1; i >= 0; i--) {
//         SONGIDS.push(list[i].id);
//     }
//     console.log(SONGIDS);
// });

CONFIG.url.songlink += SONGIDS.join(",");
CONFIG.url.songlink += ("&_=" + mplayers.getTime());



// mplayers.addScript(CONFIG.url.songlink, function() {
//     console.log("jsonp 调用成功！！！！");
// });

// mplayers.ajax.getRequest("php/post.php?time="+mplayers.getTime(),function(data){
//     console.log(data);
// });


var douban="http://www.douban.com/j/app/radio/people?version=100&app_name=radio_desktop_win&channel=153&type=n";
mplayers.ajax.getRequest("php/proxy.php?url=" +douban, function(data) {
    console.log("playlist callback");
    data = JSON.parse(data);
    console.log(data);
    // var list = data.list;
    // for (var i = list.length - 1; i >= 0; i--) {
    //     SONGIDS.push(list[i].id);
    // }
    // console.log(SONGIDS);
});