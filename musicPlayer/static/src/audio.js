(function(){

	function AudioControl(target){
		this.target=target;
	}
	AudioControl.prototype.addItem=function(name,elem){
		this[name]=elem;
	};
	AudioControl.prototype.play=function(){
		
	};

	window.onload=function(){
		var audio = document.getElementsByTagName("audio")[0];
		
		var play=document.getElementById("control-play"),
			backward=document.getElementById("control-backward"),
			forward=document.getElementById("control-forward"),
			volumeDown=document.getElementById("control-volume-down"),
			volumeUp=document.getElementById("control-volume-up");


		console.log(AudioControl);
		var audioControl = new AudioControl(audio);

		audioControl.addItem("play",play);
		audioControl.addItem("backward",backward);
		audioControl.addItem("forward",forward);
		audioControl.addItem("volumeDown",volumeDown);
		audioControl.addItem("volumeUp",volumeUp);
		
		play.status=false;
		play.addEventListener("click",function(event){
			if(play.status){
				play.status=false;
				play.title="播放";
				audio.pause();
			}else{
				play.status=true;
				play.title="暂停";
				audio.play();
			}
		},false);
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
})();