var Chart = function(socket) {
    this.socket = socket;
};

chat.prototype.sendMessage = function(room, text) {
    var message = {
        toom: room,
        text: text
    };
    this.socket.emit("message", message);
}
