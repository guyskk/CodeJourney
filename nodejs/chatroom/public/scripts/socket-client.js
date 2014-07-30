/**
 * socker-client.js
 * @authors zhanglun (you@example.org)
 * @date    2014-05-17 08:41:48
 * @version 0.0.1
 */

(function() {

    var socket = io.connect('http://localhost');
    // var socket = io.connect('http://zhanglun.kd.io');
    //进入聊天室

    var nickForm = $("#nick-form"),
        nickName = $("#nick-name"),
        nickImg = $("#nick-img");
    var usersList = $("#users-list ul");

    var msgForm = $("#msg-form"), //msg form
        msgArea = $("#text"),
        msgList = $("#msg-list ul"),
        userName = "";

    nickForm.submit(function() {
        if (nickName.val() == "") {
            return false;
        }
        var config = {
            "nickname": nickName.val(),
            "userIcon": nickImg.val()
        }
        postName(config);
        return false;   
    });

    msgForm.submit(function() {
        var config={
            "message": msgArea.val(),
             "name": nickName.val()
        }
        postMsg(config);
        return false;
    });

    function postName(config) {
        socket.emit("setName", config, function(data) {
            if (data) {
                userName = config.nickname;
                $("#login").fadeOut(function() {
                    $("#msgPanel").fadeIn();
                });
                sessionStorage.setItem("username", userName);
                msgForm.show();
            } else {
                alert("用户名不可用！");
            }
        });
    }

    //发送消息

    function postMsg(config) {
        socket.emit("user message",config);
    }

    socket.on("checkStorage", function(data) {
        if(!sessionStorage.getItem("username")){
            return false;
        }else{        
            var config={};
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i].nickname == sessionStorage.getItem("username")) {
                    config = {
                        "nickname": data[i].nickname,
                        "userIcon": data[i].userIcon
                    }
                    break;
                }
            }
            socket.emit("loadFromSession", config, function(data) {
                if (data) {
                    userName = config.nickname;
                    $("#login").fadeOut(function() {
                        $("#msgPanel").fadeIn();
                    });
                    msgForm.show();
                } else {
                    alert("用户名不可用！");
                }
            });
        }
    });

    //更新用户列表
    socket.on("nickname list", function(data) {
        var html = "";
        for (var i = data.length - 1; i >= 0; i--) {
            html += ("<li><a href='users?username=" + data[i].nickname + "'><img src='" + data[i].userIcon + "' alt='" + data[i].nickname + "'/></a></li>");
        };
        usersList.empty().append(html);
    });

    //显示自己刚才发的消息
    socket.on("user message", function(data) {
        console.log("data.name : " + data.name);
        console.log("userName : " + userName);
        var html = "";
        if (data.name !== userName) {
            html = "<li>" + data.name + " : " + data.message + "</li>";
        } else {
            html = "<li><strong>" + data.name + " : " + data.message + "</strong></li>";
        }
        msgList.prepend(html);
        $("#text").val("");
    });


})();
