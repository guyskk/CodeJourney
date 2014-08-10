(function() {

    SONGIDS = [];
    SONGLIST = [];

    function AudioControl(target) {
        this.target = target;
        this.status = false;
    }
    AudioControl.prototype.addItem = function(name, elem) {
        this[name] = elem;
    };

    AudioControl.prototype.emitplay = function() {
        var _this = this,
            play = this.play,
            audio = this.audio;
        play.addEventListener("click", function(event) {
            if (_this.status) {
                _this.status = false;
                play.title = "播放";
                audio.pause();
            } else {
                _this.status = true;
                play.title = "暂停";
                audio.play();
            }
        }, false);
    };
    // AudioControl

    AudioControl.prototype.adjustVolume = function() {
        var _this = this,
            volumeDown = this.volumeDown,
            volumeUp = this.volumeUp,
            audio = this.audio;
        volumeDown.addEventListener("click", function(event) {
            if (audio.volume > 0) {
                audio.volume = (audio.volume - 0.1).toFixed(1);
            }
        }, false);
        volumeUp.addEventListener("click", function(event) {
            if (audio.volume < 1) {
                audio.volume = (audio.volume + 0.1).toFixed(1);
            }
        }, false);
    };

    AudioControl.prototype.prev = function() {
        var _this = this,
            forward = this.backward,
            audio = this.audio,
            i = 0;
        forward.addEventListener("click", function(event) {
            if (!_this.playList) {
                alert("没有上一首!");
            }
            audio.src = "http://stream19.qqmusic.qq.com/30081265.mp3";

            audio.play();
            i++;
        }, false);
    };

    AudioControl.prototype.next = function() {
        var _this = this,
            forward = this.forward,
            audio = this.audio,
            i = 0;
        forward.addEventListener("click", function(event) {
            if (!_this.playList) {
                alert("没有下一首!");
            }
            audio.src = SONGLIST[i].songLink;

            audio.play();
            i++;
        }, false);
    };

    AudioControl.prototype.init = function() {
        this.emitplay();
        this.adjustVolume();

        this.next();
        this.prev();
    };

    AudioControl.prototype.addPlayList = function(array) {
        //暂时只是引用，其实应该是复制一份，array 在函数外部修改不应该影响到 _this.playList
        this.playList = array;
    };
    window.onload = function() {

        var audio = document.getElementsByTagName("audio")[0];
        var play = document.getElementById("control-play"),
            backward = document.getElementById("control-backward"),
            forward = document.getElementById("control-forward"),
            volumeDown = document.getElementById("control-volume-down"),
            volumeUp = document.getElementById("control-volume-up");

        var audioControl = new AudioControl(audio);

        audioControl.addItem("audio", audio);
        audioControl.addItem("play", play);
        audioControl.addItem("backward", backward);
        audioControl.addItem("forward", forward);
        audioControl.addItem("volumeDown", volumeDown);
        audioControl.addItem("volumeUp", volumeUp);
        audioControl.playList = SONGLIST;
        audioControl.init();


    };

})();
;var mplayers = {};

// mplayers.namespace=function(ns){
//     var a=
// }


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
    http.setRequestHeader("cookies", "BAIDUID=4D39573D023B4F1A304E6797EDC0687F:FG=1; BDUSS=FlMaWE4dGxJYUFia1ZGeWRHU3NQUmluYTVsajFncENpZmJkaDJSMHEwV0RCOVpUQVFBQUFBJCQAAAAAAAAAAAEAAAD47CYUUm96aW5nUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIN6rlODeq5TN; BDRCVFR[v8WxSimZ_e0]=ACuw4BhQjvbuL9LUAY8mvqV; BDRCVFR[fuyyy8mkBk_]=mk3SLVN4HKm; H_PS_PSSID=7353_6491_1436_5225_6995_7539_7442_6506_7233_6017_7203_6931_6699_7134_7417_7415; MCITY=-349%3A; fm_cloud=1; cflag=65535%3A1; BAIDU_DUP_lcr=https://www.google.com.hk/; fm_1=1407629513866; fm_dv=50; Hm_lvt_095dca06dff008569144e1c474bad69a=1405089305,1407594265; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407629514; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=227711%2C439491%2C4770778");
       http.setRequestHeader("cookies","BAIDUID=4D39573D023B4F1A304E6797EDC0687F:FG=1; BDRCVFR[v8WxSimZ_e0]=ACuw4BhQjvbuL9LUAY8mvqV; BDRCVFR[fuyyy8mkBk_]=mk3SLVN4HKm; H_PS_PSSID=7353_6491_1436_5225_6995_7539_7442_6506_7233_6017_7203_6931_6699_7134_7417_7415; MCITY=-349%3A; fm_cloud=1; cflag=65535%3A1; BAIDU_DUP_lcr=https://www.google.com.hk/; fm_1u=1; fm_1=1407630243386; fm_dv=50; Hm_lvt_095dca06dff008569144e1c474bad69a=1405089305,1407594265; Hm_lpvt_095dca06dff008569144e1c474bad69a=1407630243; fm_quality=0; fm_dc=public_yuzhong_huayu; fm_ph3=341461%2C224523%2C311471");
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
    console.log(hash_code);
});
mplayers.ajax.getRequest(baiduFm.getPlayList, function(response) {
    var list = JSON.parse(response).list;
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
