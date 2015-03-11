module.exports = function (io) {
    var sorgoscoket = {};
    var message = [];

    sorgoscoket.init = function () {
        io.on('connection', function (socket) {
            socket.emit('connected');




            socket.on('getAllMessages', function(){
                console.log('getAllmessage');
                console.log(message);
                socket.emit('allMessage', message);
            });

            socket.on('createMsg', function(msg){
                console.log('createMessage');
                message.push(msg);
                socket.emit('messageAdded', message);
            });





            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });

    };

    return {
        init: sorgoscoket.init
    };
};