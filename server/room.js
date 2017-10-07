var Game = require('./game.js').Game;

var Room = function (room_id){
    this.room_id = room_id;
    this.host = null;
    this.guest = null;
    this.game = new Game(6, 7);
    this.turn = "host";
}

Room.prototype.resetGame = function() {
    if(this.game.winner) {
        this.game.resetGame();
        this.updateClient();
        this.syncTurnState();
        this.updateGameState();
    }
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
        this.host.socket.emit('updateGameState', this.host.state);
    if(this.guest)
        this.guest.socket.emit('updateGameState', this.guest.state);
}

Room.prototype.syncTurnState = function() {
    if(!this.isFull()) {
        if(this.host)
            this.host.state = "waiting";
        if(this.guest)
            this.guest.state = "waiting";
    }
    else if(this.game.winner === 1) {
        this.host.state = "winner";
        this.guest.state = "loser";
    }
    else if(this.game.winner === 2) {
        this.host.state = "loser";
        this.guest.state = "winner";
    }
    else if(this.turn == "host") {
        this.host.state = "your_turn";
        this.guest.state = "not_your_turn";
    }
    else {
        this.host.state = "not_your_turn";
        this.guest.state = "your_turn";
    }
}

Room.prototype.leave = function(client_id) {
    if(this.host && this.host.id == client_id) {
        this.host = null;
        this.syncTurnState();
        this.updateGameState();
    }
    if(this.guest && this.guest.id == client_id) {
        this.guest = null;
        this.syncTurnState();
        this.updateGameState();
    }
}

Room.prototype.joinRoom = function(client) {
    if(this.isFull()) {
        console.log("Room is full");
        return null;
    }

    var new_player = {
        id: client.id,
        socket: client,
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
        if(typeof column != "number" || column < 0 || column >= parent.game.columns)
            return;
        // Process command only if the room is full, there is no winner yet, and it's the player's turn
        if(parent.isFull() && !parent.game.winner && roleAssign == parent.turn) {
            if(parent.game.putPiece(pieceAssign, column))
                parent.changeTurns();
            parent.updateClient();
            parent.syncTurnState();
            parent.updateGameState();
        }
    });

    client.on('resetGame', function() {
        parent.resetGame();
    });

    this.updateClient();
    this.syncTurnState();
    this.updateGameState();
    return true;
}

exports.Room = Room;