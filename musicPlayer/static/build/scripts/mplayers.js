(function(){

	SONGIDS=[];
	SONGLIST=[];

	function AudioControl(target){
		this.target=target;
		this.status=false;
	}
	AudioControl.prototype.addItem=function(name,elem){
		this[name]=elem;
	};

	AudioControl.prototype.emitplay=function(){
		var _this=this,
			play=this.play,
			audio=this.audio;
		play.addEventListener("click",function(event){
			if(_this.status){
				_this.status=false;
				play.title="播放";
				audio.pause();
			}else{
				_this.status=true;
				play.title="暂停";
				audio.play();
			}
		},false);
	};
	// AudioControl

	AudioControl.prototype.adjustVolume=function(){
		var _this=this,
			volumeDown=this.volumeDown,
			volumeUp=this.volumeUp,
			audio=this.audio;
		volumeDown.addEventListener("click",function(event){
			if(audio.volume>0){
				audio.volume=(audio.volume-0.1).toFixed(1);
			}
		},false);
		volumeUp.addEventListener("click",function(event){
			if(audio.volume<1){
				audio.volume=(audio.volume+0.1).toFixed(1);
			}
		},false);
	};


	AudioControl.prototype.next=function(){
		var _this=this,
			forward=this.forward,
			audio=this.audio,
			i=0;
			console.log(forward);
		forward.addEventListener("click",function(event){
			// mplayers.ajax.getRequest("php/post.php?time="+mplayers.getTime(),function(data){
			// console.log(data);
			// });
		audio.src=SONGLIST[i].songLink;


		audio.src="http://stream19.qqmusic.qq.com/30081265.mp3";

		audio.play();
		i++;
		},false);

	};

	window.onload=function(){

		var audio = document.getElementsByTagName("audio")[0];
		var play=document.getElementById("control-play"),
			backward=document.getElementById("control-backward"),
			forward=document.getElementById("control-forward"),
			volumeDown=document.getElementById("control-volume-down"),
			volumeUp=document.getElementById("control-volume-up");

		var audioControl = new AudioControl(audio);

		audioControl.addItem("audio",audio);
		audioControl.addItem("play",play);
		audioControl.addItem("backward",backward);
		audioControl.addItem("forward",forward);
		audioControl.addItem("volumeDown",volumeDown);
		audioControl.addItem("volumeUp",volumeUp);

		console.log(audioControl);
		audioControl.emitplay();
		audioControl.adjustVolume();
		audioControl.next();


	};
})();;var mplayers = {
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
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
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

var douban = "http://douban.fm/j/mine/playlist?type=p&sid=1821905&pt=0.0&channel=153&pb=64&from=mainsite&r=aa0106fd44";

var netcase = {
    "post": "http://music.163.com/api/artist/albums/10557?offset=0&limit=3",
    "get": ""
};

// document.cookie = "appver=2.0.2";

mplayers.ajax.postRequest("php/proxy.php?url=" + netcase.post, "csrf_token=", function(data) {
    console.log(data);
    document.getElementsByTagName("body")[0].innerHTML+=data;
});

// mplayers.ajax.getRequest("php/proxy.php?url=" + CONFIG.url.users+mplayers.getTime(), function(data) {
//     console.log(data);
//     document.getElementsByTagName("body")[0].innerHTML=data;
// });




// mplayers.ajax.getRequest(netcase, function(data) {
//     console.log("playlist callback");
//     data = JSON.parse(data);
//     console.log(data);
// });
