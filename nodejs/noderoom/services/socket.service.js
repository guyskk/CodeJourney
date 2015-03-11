module.exports = function(io){
    var sorgoscoket = {};
    var message = [];

    sorgoscoket.init = function(){
        io.on('connection', function(socket){
          console.log('a user connected');
          socket.emit('hi', {word: 'hello!!'});
          socket.emit('connected');
          socket.on('disconnect', function(){
            console.log('user disconnected');
          });

          socket.on('send msg', function(msg){
            console.log('message: ' + msg);
          })
        });

    };

    return {
        init: sorgoscoket.init
    };
};