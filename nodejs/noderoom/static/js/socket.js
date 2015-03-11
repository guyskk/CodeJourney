(function(global){
    var socket = io();
    global.socket = socket;
    socket.on('connected', function(){
        alert('Chatroom connected!');
    });
    socket.on('get msg', function(){
        console.log('!!!!!!get!');
    });
    socket.on('hi', function(msg){
        console.log(msg.word);
    });
})(window);