var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');

var port = process.env.PORT || 8080;

var rooms = {};

// Front-end files
app.use('/public', express.static('public'));

app.get('/', function(req, res){
    var newRoom = shortid.generate();
    rooms[newRoom] = true;
    res.redirect('/' + newRoom);
    //res.sendFile(__dirname + '/public/index.html');
    // Create new rooms
});

app.get('/:room_id', function(req, res){
    // Check if room exists and join room
    if(rooms.hasOwnProperty(req.params.room_id)) {
        res.sendFile(__dirname + '/index.html');
        return;
    }
    // Else create new room
    else {
        var newRoom = shortid.generate();
        rooms[newRoom] = true;
        res.redirect('/' + newRoom);
    }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});