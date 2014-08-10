var mplayers = {};

var mplayers = {
    "ajax": {
        "getRequest": null
    }
};
//GET
mplayers.ajax.getRequest = function(url, callback) {
    var http = new XMLHttpRequest();
    url = "php/proxy.php?url=" + url;
    http.open("GET", url, false);

    // http.setRequestHeader("cookies", "BAIDUID=4D39573D023B4F1A304E6797EDC0687F:FG=1; BDUSS=FlMaWE4dGxJYUFia1ZGeWRHU3NQUmluYTVsajFncENpZmJkaDJSMHEwV0RCOVpUQVFBQUFBJCQAAAAAAAAAAAEAAAD47CYUUm96aW5nUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIN6rlODeq5TN; BDRCVFR[v8WxSimZ_e0]=ACuw4BhQjvbuL9LUAY8mvqV; BDRCVFR[fuyyy8mkBk_]=mk3SLVN4HKm; H_PS_PSSID=7353_6491_1436_5225_6995_7539_7442_6506_7233_6017_7203_6931_6699_7134_7417_7415; MCITY=-349%3A; fm_cloud=1; cflag=65535%3A1; BAIDU_DUP_lcr=https://www.google.com.hk/; fm_1=1407629513866; fm_dv=50; Hm_lvt_095dca06dff008569144e1c474bad69a=1405089305,1407594265; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407629514; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=227711%2C439491%2C4770778");
    http.setRequestHeader("cookies", "BAIDUID=A652189AF2968B7FDB7CBCD4B4EB4C1A:FG=1; fm_cloud=1; fm_1u=1; BDUSS=FpvRW44dFowNjZLdFd4MEVzLXhhV0NYM3IxbHExUGJ3TnNnWElLbzBKQURRQUJVQVFBQUFBJCQAAAAAAAAAAAEAAAD47CYUUm96aW5nUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOz2FMDs9hTR; H_PS_PSSID=6255_1450_7801_6504_7635_6017_7825_7674_7922_7606_7798_8035_7963_7415_7688_7791_7475; cflag=65535:1; BAIDU_DUP_lcr=https://www.google.com.hk/; BDRCVFR[fuyyy8mkBk_]=mk3SLVN4HKm; SFSSID=jn2inoojbh0gmrutdak2848es6; MCITY=-%3A; locale=zh; fm_1=1407636802539; fm_dv=50; Hm_lvt_095dca06dff008569144e1c474bad69a=1405898482,1407368492; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407636803; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=279802%2C299426%2C10230112");
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
    // http.setRequestHeader("cookies", "BAIDUID=4D39573D023B4F1A304E6797EDC0687F:FG=1; BDUSS=FlMaWE4dGxJYUFia1ZGeWRHU3NQUmluYTVsajFncENpZmJkaDJSMHEwV0RCOVpUQVFBQUFBJCQAAAAAAAAAAAEAAAD47CYUUm96aW5nUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIN6rlODeq5TN; BDRCVFR[v8WxSimZ_e0]=ACuw4BhQjvbuL9LUAY8mvqV; BDRCVFR[fuyyy8mkBk_]=mk3SLVN4HKm; H_PS_PSSID=7353_6491_1436_5225_6995_7539_7442_6506_7233_6017_7203_6931_6699_7134_7417_7415; MCITY=-349%3A; fm_cloud=1; cflag=65535%3A1; BAIDU_DUP_lcr=https://www.google.com.hk/; fm_1=1407629513866; fm_dv=50; Hm_lvt_095dca06dff008569144e1c474bad69a=1405089305,1407594265; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407629514; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=227711%2C439491%2C4770778");
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



var baiduFm = {
    "channel": "public_yuzhong_huayu",
    "getHashCode": "http://fm.baidu.com/dev/api/?tn=usercounts&_=" + mplayers.getTime(),
    "getPlayList": "http://fm.baidu.com/dev/api/?tn=playlist&id=" + this.channel + "&special=flash&prepend=&format=json&_=" + mplayers.getTime(),
    "getSongList": "http://music.baidu.com/data/music/fmlink?type=mp3&rate=128&songIds=615750,50326329,285172&callback=jsonpGetSongList&_=1407594343228"
};



mplayers.ajax.getRequest(baiduFm.getHashCode, function(response) {
    var hash_code = JSON.parse(response).hash_code;
    console.log(JSON.parse(response));
});
mplayers.ajax.getRequest(baiduFm.getPlayList, function(response) {
    var list = JSON.parse(response).list;
    console.log(JSON.parse(response));
    var idStr = "";
    for (var i = 0; i < list.length; i++) {
        idStr += list[i].id + ",";
    }
    var url = "http://music.baidu.com/data/music/fmlink?type=mp3&rate=128&songIds=" + idStr + "&callback=getSongList&_=" + mplayers.getTime();
    mplayers.addScript(url, function() {
        console.log("jsonp success!");
    });

});


function getSongList(response) {
    console.log(response);
    var songList = response.data.songList;
    var j=0;
    for (var i = 0, len = songList.length; i < len; i++) {
        if(songList[i].songLink.indexOf("file.qianqian.com") == -1){
            SONGLIST[j] = songList[i];
            j++;

        }
    }
}
