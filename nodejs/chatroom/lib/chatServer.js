var socketio = require('socket.io'),
    io;
var userCount = 0,
    USERS = [];

module.exports.listen = function(server) {

    io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
        userCount++;

        checkStorage_emit(socket);
        //设置用户名
        setName_on(socket);

        loadFromSession_on(socket);
        //更新列表
        refreshUsersList_emit(socket);
        
        //消息处理
        messageHandler_on(socket);

        //断开连接
        socket.on("disconnect", function() {
            //更新在线人数
            userCount--;
            if (!socket.name) {
                return false
            }
            var nameChecked = USERS.indexOf(socket.name);
            if (nameChecked > -1) {
                USERS.splice(nameChecked);
            }

            refreshUsersList_emit(socket);


        });
    });

}

function checkStorage_emit(socket){
    socket.emit("checkStorage",USERS);
}

function setName_on(socket) {
    socket.on("setName", function(data, callback) {
        var name = data.nickname,
            userIcon=data.userIcon;
        var check=true;
        if(USERS.length>0){
            for(var i=USERS.length-1;i>=0;i--){

                if(USERS[i].nickname === name){
                    check=false;
                    break;
                }
            }
        }
        if (check) {
            callback(true);
            console.log("data");
            console.log(data);
            USERS.push(data);
            console.log(USERS);
            socket.name = name;
            socket.icon=userIcon;
            socket.broadcast.emit("nickname list", USERS);
            socket.emit("nickname list", USERS);
        } else {
            callback(false);
        }
    });
}

function loadFromSession_on(socket){
    socket.on("loadFromSession", function(data, callback) {
        var name = data.nickname,
            userIcon=data.userIcon;
        var check=true;
        if(USERS.length>0){
            for(var i=USERS.length-1;i>=0;i--){
                if(USERS[i].nickname===name){
                    callback(true);

                    socket.name = name;
                    socket.icon=userIcon;
                    socket.broadcast.emit("nickname list", USERS);
                    socket.emit("nickname list", USERS);
                    break;
                }
            }
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