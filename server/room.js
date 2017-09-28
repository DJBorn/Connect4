var Game = require('./game.js').Game;

var Room = function (room_id){
    this.room_id = room_id;
    this.host = null;
    this.guest = null;
    this.gameEnded = false;
    this.game = new Game(6, 7);
    this.turn = "host";
    this.gameState = "waiting";
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
        this.host.socket.emit('updateBoard', this.game.board);
    if(this.guest)
        this.guest.socket.emit('updateBoard', this.game.board);
}

Room.prototype.updateGameState = function () {
    if(this.host)
        this.host.socket.emit('updateGameState', this.gameState);
    if(this.guest)
        this.guest.socket.emit('updateGameState', this.gameState);
}

Room.prototype.leave = function(client_id) {
    if(this.host && this.host.id == client_id) {
        this.host = null;
        if(this.guest)
            this.guest.socket.emit('showShareURLMessage', true);
    }
    if(this.guest && this.guest.id == client_id) {
        this.guest = null;
        if(this.host)
            this.host.socket.emit('showShareURLMessage', true);
    }
}

Room.prototype.joinRoom = function(client) {
    if(this.isFull()) {
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
        if(!this.isFull())
            this.host.socket.emit('showShareURLMessage', true);
        else
            this.guest.socket.emit('showShareURLMessage', false);
    }
    // Then try to fill the guest position
    else if(!this.guest) {
        this.guest = new_player;
        pieceAssign = 2;
        roleAssign = "guest";
        if(!this.isFull())
            this.guest.socket.emit('showShareURLMessage', true);
        else
            this.host.socket.emit('showShareURLMessage', false);
    }

    var parent = this;
    // Add listener for putting a piece for the new client
    client.on('putPiece', function(column){
        if(parent.isFull() && !parent.game.winner && roleAssign == parent.turn) {
            if(parent.game.putPiece(pieceAssign, column))
                parent.changeTurns();
            parent.updateClient();
        }
    });

    if(this.isFull())
        this.updateGameState();
    this.updateClient();
    return true;
}

exports.Room = Room;