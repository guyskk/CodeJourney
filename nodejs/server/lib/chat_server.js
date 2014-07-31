var socketio = require("socket.io");
var io;
var guestNumber = 1;
var nickNames = {};
var currentRoom = {};

exports.listen = function(server) {
    io = socket.listen(server);
    io.set("log level", 1);
    io.socket.on("connection", function(socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, "Lobby");
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, nameUsed);
        handleRoomJoining(socket);
        socket.on("rooms", function() {
            socket.emit("rooms", io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames.nameUsed);
    });
}

function assignGuestName(){}
function joinRoom(){}
function handleMessageBroadcasting(){}
function handleNameChangeAttempts(){}
function handleRoomJoinging(){}

