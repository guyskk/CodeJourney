		var MYAPP= MYAPP || {};

		var M=MYAPP;

		MYAPP.namespace=function(para){
			if(para === undefined){
				return false;
			}
			var parts=para.split("."),
				parent=MYAPP;
			//剥离多余的全局变量
			if(parts[0] == "MYAPP"){
				parts=parts.splice(1);
			}

			for(var i=0;i<parts.length;i++){
				if(parent[parts[i]] === undefined){
					parent[parts[i]]={};
				}
			parent=parent[parts[i]];
			}

		return parent;

		};


		var Event=MYAPP.namespace("Event");
		var DOM=MYAPP.namespace("DOM");

		DOM.getElementById=function(id){
			return document.getElementById(id);
		};
		// DOM.getElementsByClassName=function(class){
		// 	// if(document.getElementsByClassName){
		// 	// 	return document.getElementsByClassName(class);
		// 	// }else{
		// 	// 	var parent=
		// 	// }
		// }

		Event.getEvent=function(e){
			return e ? e : window.event;
		}
		Event.getTarget=function(e){
			console.log(this);
			var event=this.getEvent(e);
			return event.target ? event.target : event.srcElement;
		}
