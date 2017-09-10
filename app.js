var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

// Front-end files
app.use(express.static('public'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
    // Create new rooms
});

app.get('/:room_id', function(req, res){
    // Check if room exists and join room
    res.sendFile(__dirname + '/index.html');
    //res.send("Join existing room " + req.params.room_id);
    // Else create new room
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});