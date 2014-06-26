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
})();