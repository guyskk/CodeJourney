module.exports = function(io){
    var sorgoscoket = {};
    var ss = sorgoscoket;
    ss.init = function(){
        console.log('sorgoscoket init()!');
        io.on('connection', function(socket){
          console.log('a user connected');
          socket.emit('hi', {word: 'hello!!'});
          socket.on('disconnect', function(){
            console.log('user disconnected');
          });
          socket.on('send msg', function(msg){
            console.log('------><------');
            console.log('message: ' + msg);
          })
        });

    };

    return {
        init: ss.init
    };
};