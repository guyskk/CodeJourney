var socketio = require('socket.io'),
    io;
var userCount = 0,
    USERS = [];

module.exports.listen = function(server) {

    io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
        userCount++;
        //设置用户名
        setName_on(socket);
        //更新列表
        // refreshUsersList_emit(socket);
        
        //消息处理
        messageHandler_on(socket);

        //断开连接
        socket.on("disconnect", function() {
            //更新在线人数
            userCount--;
            if (!socket.name) {
                return false
            }
            console.log(USERS);
            var nameChecked = USERS.indexOf(socket.name);
            if (nameChecked > -1) {
                USERS.splice(nameChecked);
            }

        });
    });

}

function setName_on(socket) {
    socket.on("setName", function(data, callback) {
        var name = data.nickname
            userIcon=data.userIcon;
        if (USERS.indexOf(name) != -1) {
            callback(false);
        } else {
            callback(true);
            USERS.push(data);
            socket.name = name;
            socket.icon=userIcon;
            socket.broadcast.emit("nickname list", USERS);
            socket.emit("nickname list", USERS);
        }
    });
}

function messageHandler_on(socket){
    socket.on("user message", function(data) {
        socket.broadcast.emit("user message", {
            name: socket.name,
            message: data.message
        });
        socket.emit("user message", {
            name: socket.name,
            message: data.message
        });
    });

}

function refreshUsersList_emit(socket){
    socket.emit("nickname list", USERS);
    socket.broadcast.emit("nickname list", USERS);
}