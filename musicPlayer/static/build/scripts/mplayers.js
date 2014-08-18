function AudioControl(target) {
    this.target = target;
    this.status = false;
    this.songList = [];
    this.playingIndex = 0;
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
// 上一首
AudioControl.prototype.prev = function() {
    var _this = this,
        forward = this.backward,
        audio = this.audio;
    forward.addEventListener("click", function(event) {
        if (!_this.playList) {
            alert("没有上一首!");
        }
        // _this.playingIndex=_this.random();
        if (_this.playingIndex <= 0) {
            _this.playingIndex = _this.playList.length - 1;
        }else{
            _this.playingIndex--;
        }
        console.log(_this.playingIndex);
        audio.src = _this.playList[_this.playingIndex];

        audio.play();
        
    }, false);
};
// 下一首
AudioControl.prototype.next = function() {
    var _this = this,
        forward = this.forward,
        audio = this.audio,
        i = 0;
    forward.addEventListener("click", function(event) {
        if (!_this.playList) {
            alert("没有下一首!");
        }
        // 下一首的歌曲链接
        // _this.playingIndex=_this.random();
        console.log(_this.playingIndex);
        if (_this.playingIndex >= _this.playList.length - 1) {
            _this.playingIndex = 0;
        } else {
            _this.playingIndex++;
        }
        audio.src = _this.playList[_this.playingIndex];
        audio.play();
    }, false);
};

// 初始化
AudioControl.prototype.init = function() {
    this.emitplay();
    this.adjustVolume();
    this.next();
    this.prev();
};

AudioControl.prototype.random=function(){
    var index=Math.floor(Math.random()*4);
    return index;
};

AudioControl.prototype.addPlayList = function(array) {
    //暂时只是引用，其实应该是复制一份，array 在函数外部修改不应该影响到 _this.playList
    this.playList = array;
};;$(document).ready(function() {
    var SONGLiST = [
        "http://1.mplayers.sinaapp.com/mplayer/music/01%20Avicii%20vs.%20Nicky%20Romero%20-%20I%20Could%20Be%20The%20One%20(Nicktim%20Radio%20Edit).mp3",
        "http://1.mplayers.sinaapp.com/mplayer/music/02%20Otto%20Knows%20-%20Million%20Voices%20(Radio%20Edit).mp3",
        "http://1.mplayers.sinaapp.com/mplayer/music/03%20The%20Wanted%20-%20Chasing%20The%20Sun%20(Hardwell%20Edit).mp3",
        "http://1.mplayers.sinaapp.com/mplayer/music/04%20DJ%20Antoine%20-%20Bella%20Vita%20(DJ%20Antoine%20vs.%20Mad%20Mark%202K13%20Radio%20Edit).mp3",
        "http://1.mplayers.sinaapp.com/mplayer/music/05%20Dada%20Life%20-%20So%20Young%20So%20High%20(Radio%20Edit).mp3",
        "http://1.mplayers.sinaapp.com/mplayer/music/1772883837_11718726_l.mp3"
    ];

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
    audioControl.addPlayList(SONGLiST);
    audioControl.audio.src=SONGLiST[Math.floor(0+Math.random()*4)];
    audioControl.init();
    




});
