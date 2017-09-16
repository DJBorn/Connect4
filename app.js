var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');
var RoomManager = require('./roomManager.js').RoomManager;

var port = process.env.PORT || 8080;

var rooms = new RoomManager();

// Front-end files
app.use('/public', express.static('public'));

io.use(function(socket, next) {
    var room_id = socket.request._query['room_id']
    rooms.joinRoom(room_id, socket);
    next();
})

app.get('/', function(req, res){
    var room_id = shortid.generate();
    while(rooms.roomExists(room_id)) {
        room_id = shortid.generate();
    }
    rooms.createRoom(room_id);
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
        room_id = shortid.generate();
        while(rooms.roomExists(room_id)) {
            room_id = shortid.generate();
        }
        rooms.createRoom(room_id);
        res.redirect('/' + room_id);
    }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
    //console.log(socket);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('disconnect', function() {
        rooms.leave(socket.id);
    });
});