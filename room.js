var Board = require('./board.js').Board;

var Room = function (room_id){
    this.room_id = room_id;
    this.host = null;
    this.guest = null;
    this.gameEnded = false;
    this.board = new Board(6, 7);
    this.turn = "host";
}

Room.prototype.changeTurns = function() {
    if(this.turn == "host")
        this.turn = "guest";
    else
        this.turn = "host";
}

Room.prototype.isFull = function () {
    return this.host && this.guest;
}

Room.prototype.isEmpty = function () {
    return !this.host && !this.guest;
}

Room.prototype.updateClient = function () {
    if(this.host)
        this.host.socket.emit('updateBoard', this.board.board);
    if(this.guest)
        this.guest.socket.emit('updateBoard', this.board.board);
}

Room.prototype.leave = function(client_id) {
    if(this.host && this.host.id == client_id) {
        this.host = null;
    }
    if(this.guest && this.guest.id == client_id) {
        this.guest = null;
    }
}

Room.prototype.joinRoom = function(client) {
    if(this.host && this.guest) {
        console.log("Room is full");
        return null;
    }

    var new_player = {
        id: client.id,
        socket: client
    }

    var pieceAssign;
    var roleAssign;
    // Try to fill host position first
    if(!this.host) {
        this.host = new_player;
        pieceAssign = 1;
        roleAssign = "host";
    }
    // Then try to fill the guest position
    else if(!this.guest) {
        this.guest = new_player;
        pieceAssign = 2;
        roleAssign = "guest";
    }

    var parent = this;
    // Add listener for putting a piece for the new client
    client.on('putPiece', function(column){
        if(roleAssign == parent.turn && !parent.gameEnded) {
            if(parent.board.putPiece(pieceAssign, column))
                parent.changeTurns();
        }
        parent.updateClient();
    });

    parent.updateClient();
    return true;
}

exports.Room = Room;