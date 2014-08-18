$(document).ready(function() {
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
