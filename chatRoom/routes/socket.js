var socketio = require('socket.io'),
    io;
var userCount = 0,
        usersName = [];

export.listen=function(){

  io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
        userCount++;

        /* 用户
         *  设置昵称，更新在线用户列表
         */
        socket.on("setnickname", function(data, callback) {
            var name = data.nickname;
            if (usersName.indexOf(name) != -1) {
                callback(false);
            } else {
                callback(true);
                usersName.push(name);
                socket.name = name;
                socket.broadcast.emit("nickname list", usersName);
                socket.emit("nickname list", usersName);
            }
        });

        socket.emit("nickname list", usersName);
        socket.broadcast.emit("nickname list", usersName);

        //消息处理
        socket.on("user message", function(data) {
          socket.broadcast.emit("user message",{
            name : socket.name,
            message: data.message
          });
          socket.emit("user message",{
            name : socket.name,
            message: data.message
          });
        });


        //断开连接
        socket.on("disconnect", function() {
            //更新在线人数
            userCount--;
            if (!socket.name) {
                return false
            }
            console.log(usersName);
            var nameChecked = usersName.indexOf(socket.name);
            if (nameChecked > -1) {
                usersName.splice(nameChecked);
            }

        });
    });

}
