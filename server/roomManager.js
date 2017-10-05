var Room = require('./room.js').Room;
var shortid = require('shortid');

var RoomManager = function () {
    var rooms = {};
    var roomTimer = 60000;

    this.createRoom = function() {
        room_id = shortid.generate();
        while(this.roomExists(room_id)) {
            room_id = shortid.generate();
        }
        rooms[room_id] = new Room(room_id);
        return room_id;
    }

    this.roomIsFull = function(room_id) {
        if(rooms[room_id]);
            return rooms[room_id].isFull();
    }

    this.roomExists = function(room_id) {
        return rooms.hasOwnProperty(room_id)
    }

    this.leave = function(client_id) {
        // Find the client and remove him from the room
        for (var room in rooms) {
            if(!rooms.hasOwnProperty(room)) 
                continue;
            rooms[room].leave(client_id);
            if(rooms[room].isEmpty())
                rooms[room].timeOut = setTimeout(function(){ 
                    if(rooms[room] && rooms[room].isEmpty())
                        delete rooms[room];
                }, roomTimer);
        }
        console.log(client_id + " has left");
    }

    this.joinRoom = function(room_id, client) {
        // Check if room exists and join room if it's not full
        if(!this.roomExists(room_id) || this.roomIsFull(room_id)) {
            return false;
        }
        rooms[room_id].joinRoom(client);
        console.log(client.id + " has joined room " + room_id);
        return true;
    }
}

exports.RoomManager = RoomManager;