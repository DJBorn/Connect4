var Board = require('./board.js').Board;

var Room = function (room_id){
    this.room_id = room_id;
    this.host = null;
    this.guest = null;
    this.board = new Board(6, 7);
}

Room.prototype.isFull = function () {
    return this.host && this.guest;
}

Room.prototype.updateClient = function () {
    this.host.socket.emit('updateBoard', this.board.board);
    this.guest.socket.emit('updateBoard', this.board.board);
}

Room.prototype.joinRoom = function(client) {
    var new_player = {
        id: client.id,
        socket: client
    }
    // Try to fill host position first
    if(!this.host)
        this.host = new_player;
    // Then try to fill the guest position
    else if(!this.guest)
        this.guest = new_player;
    
    // Temporary socket listeners
    if(this.isFull()) {
        var parent = this;
        this.host.socket.on('putPiece', function(column){
            parent.board.putPiece(1, column);
            parent.updateClient();
        });
        this.guest.socket.on('putPiece', function(column){
            parent.board.putPiece(2, column);
            parent.updateClient();
        });
    }
}

exports.Room = Room;