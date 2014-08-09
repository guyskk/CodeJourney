
var mplayers={};

// mplayers.namespace=function(ns){
//     var a=
// }


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

//GET
mplayers.ajax.getRequest = function(url, callback) {
    var http = new XMLHttpRequest();

    http.open("GET", url, false);

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    };
    http.send(null);
};

//POST
mplayers.ajax.postRequest = function(url, para, callback) {
    var http = new XMLHttpRequest();

    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "applicaiotn/x-www-form-urlencoded");
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.setRequestHeader("cookies","BAIDUID=920CC4796EF5303142F616848B57AA86:FG=1; fm_1=1407590010867; fm_dv=50; fm_1u=1; Hm_lvt_095dca06dff008569144e1c474bad69a=1407590002; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407590002; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=769145");
    http.send(para);

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    };


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

// var douban = "http://douban.fm/j/mine/playlist?type=p&sid=1821905&pt=0.0&channel=153&pb=64&from=mainsite&r=aa0106fd44";

var netcase = {
    "post": "http://music.163.com/api/artist/albums/10557?offset=0&limit=3",
    "get": ""
};

var douban={
    "getChannels":"http://www.douban.com/j/app/radio/channels",
    "getList":"http://www.douban.com/j/app/radio/people?app_name=radio_desktop_win&version=100&user_id=&expire=&token=&sid=&h=&channel=1&type=n",
    "playlist":"http://www.douban.com/j/app/radio/people",
    "playlistParams":"?app_name=radio_desktop_win&version=100&type=e"
};


// document.cookie = "appver=2.0.2";

// mplayers.ajax.postRequest("php/proxy.php?url=" + netcase.post, "csrf_token=", function(data) {
//     console.log(data);
//     document.getElementsByTagName("body")[0].innerHTML += data;
// });

mplayers.ajax.getRequest("php/proxy.php?url=" + douban.getChannels, function(response) {

    document.body.innerHTML +=response;
    var listContainer=document.getElementById("channels-list");

    var html="";
    var channels=JSON.parse(response).channels;

    for(var i=0,len=channels.length;i<len-1;i++){

        html+= "<li>"+channels[i].name +" : "+channels[i].channel_id+"</li>";
    }
    listContainer.innerHTML=html;
});
mplayers.ajax.getRequest("php/proxy.php?url="+"http://fm.baidu.com/dev/api/?tn=playlist&id=public_yuzhong_huayu&special=flash&prepend=&format=json&_=1407590010199",function(response){
    console.log(response);
});

//post  获得 hashcode
var timestamp=new Date().getTime();
mplayers.ajax.postRequest("php/proxy.php?url="+"http://fm.baidu.com/dev/api/?tn=usercounts&_=1407590010198","tn=usercounts&_="+(new Date()).getTime(),function(response){
    console.log(response);
});
