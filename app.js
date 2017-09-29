var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var RoomManager = require('./server/roomManager.js').RoomManager;

var port = process.env.PORT || 80;

var rooms = new RoomManager();
//var client_communicator = new ClientCommunicator(http);

// Front-end files
app.use('/public', express.static('public'));

io.use(function(socket, next) {
    var room_id = socket.request._query['room_id'];
    rooms.joinRoom(room_id, socket);
    next();
});

app.get('/', function(req, res){
    var room_id = rooms.createRoom();
    res.redirect('/' + room_id);
    // Create new rooms
});

app.get('/:room_id', function(req, res){
    var room_id = req.params.room_id;

    // If the room exists and is not full then serve the main page
    if(rooms.roomExists(req.params.room_id) && !rooms.roomIsFull(room_id)) {
        res.sendFile(__dirname + '/index.html');
        return;
    }
    // Otherwise create a new room and redirect to that room
    else {
        room_id = rooms.createRoom();
        res.redirect('/' + room_id);
    }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
    socket.on('disconnect', function() {
        rooms.leave(socket.id);
    });
});