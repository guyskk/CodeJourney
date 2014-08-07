var socketio = require("socket.io");
var io;
var guestNumber = 1;
var nickNames = {};
var currentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set("log level", 1);
    io.sockets.on("connection", function(socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, "Lobby");
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        socket.on("rooms", function() {
            socket.emit("rooms", io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed);
    });
}
//生成用户名，绑定ID
function assignGuestName(socket, guestNumber, nickNames,namesUsed){
	var name = "Guest" + guestNumber;
	nickNames[socket.id]=name;
	socket.emit("nameResult",{
		success:true,
		name:name
	});
	namesUsed.push(name);
	return guestNumber+1;
}

function joinRoom(socket){
	//加入房间
	socket.join(room);
	currentRooms[socket.id]=room;
	socket.emit("joinResult",{room:room});
	//广播新用户加入
	socket.broadcast.to(room).emit("message",{
		text:nickNames[socket.id]+" has joined "+room+ "."
	});

	var usersInRoom=io.sockets.clients(room);
	if(usersInRoom.length>1){
		var usersInRoomSummary = "Users currently in "+room+" : ";
		for(var index in usersInRoom){
			var userSocketId=usersInRoom[index].id;
			if(userSocketId!=usersInRoom[index].id){
				if(index > 0){
					usersInRoomSummary += ", ";
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += ".";
		socket.emit("message",{text:usersInRoomSummary});
	}
}
function handleNameChangeAttempts(socket,nickNames,namesUsed){
	socket.on("nameAttempt",function(name){
		//以 "Guest" 开头
		if(name.indexOf("Guest") == 0){
			socket.emit("nameResult",{
				success:false,
				message:"Name cannot begin with \"Guest\"."
			});
		}else{
			//检查 name 是否已经被使用
			//如果未被使用，则将目前的名字替换
			if(namesUsed.indexOf(name) == -1){
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id]=name;
				delete namesUsed[previousNameIndex];
				socket.emit("nameResult",{
					success:true,
					name:name
				});
				socket.broadcast.to(currentRoom[socket.id].emit("message",{
					text:previousName + " is now known as " +name+"."
				}));
			}else{
				//如果 name 已经存在
				socket.emit("nameResult",{
					success:false,
					message: "That name is already in use !"
				});
			}
		}
	});
}
//广播用户发送的消息
function handleMessageBroadcasting(socket){
	socket.on("message",function(message){
		socket.broadcast.to(message.room).emit("message",{
			text:nickNames[socket.id]+" : "+message.text
		});
	});
}
function handleRoomJoinging(socket){
	socket.on("join",function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}
function handleClientDisconnection(socket){
	socket.on("disconnect",function(){
		var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	})
}
