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
        if(nickName.val()==""){
            return false;
        }
        socket.emit("setName", {
            nickname: nickName.val(),
            userIcon: nickImg.val()
        }, function(data) {
            if (data) {
                userName = nickName.val();
                $("#login").fadeOut(function(){
                    $("#msgPanel").fadeIn();
                });
                msgForm.show();
            } else {
                alert("用户名不可用！");
            }
        });
        return false;
    });

    //发送消息
    msgForm.submit(function() {
        socket.emit("user message", {
            message: msgArea.val(),
            name: nickName.val()
        });
        return false;
    });

    //更新用户列表
    socket.on("nickname list", function(data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            console.log(data[0]);
            console.log(data.length);
            html = ("<li><a href='users?username="+data[i].nickname+"'><img src='"+data[i].userIcon+"' alt='"+data[i].nickname+"'/></a></li>");
        };
        usersList.empty().append(html);
    });

    //显示自己刚才发的消息
    socket.on("user message", function(data) {
        console.log("data.name : "+data.name);
        console.log("userName : "+userName);
        var html="";
        if(data.name !== userName){
          html= "<li>" + data.name + " : " + data.message + "</li>";
        }else{
          html= "<li><strong>" + data.name + " : " + data.message + "</strong></li>";
        }
        msgList.prepend(html);
        $("#text").val("");
    });


})();