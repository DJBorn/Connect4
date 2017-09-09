var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    // Create new rooms
    res.send("Make new room");
});

app.get('/:room_id', function(req, res){
    // Check if room exists and join room
    res.send("Join existing room " + req.params.room_id);
    // Else create new room
});

var port = process.env.PORT || 8080;

http.listen(port, function(){
  console.log('listening on *:' + port);
});