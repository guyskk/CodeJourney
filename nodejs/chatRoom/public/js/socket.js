(function(global){
    var socket = io();
    global.socket = socket;
    socket.on('get msg', function(){
        console.log('!!!!!!get!');
    });
    socket.on('hi', function(msg){
        alert(msg + 1111);
    });
})(window);