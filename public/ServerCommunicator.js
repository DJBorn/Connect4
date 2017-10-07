var ServerCommunicator = function() {
    var socket = io.connect(window.location.hostname, { 
        query: 'room_id=' + window.location.pathname.substr(1),
        transports: ['websocket'], 
        upgrade: false
    });
    
    this.putPiece = function(column) {
        socket.emit('putPiece', column);
    }
    
    this.resetGame = function(column) {
        socket.emit('resetGame');
    }

    this.addListener = function(emitName, fn) {
        socket.on(emitName, fn);
    }
}