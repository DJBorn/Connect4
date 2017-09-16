var Room = require('./room.js').Room;

var RoomManager = function () {
    var rooms = {};

    this.createRoom = function(room_id) {
        if(rooms.hasOwnProperty(room_id)) {
            console.log("Room already exists.");
            return false;
        }
        rooms[room_id] = new Room(room_id);
        return true;
    }

    this.roomIsFull = function(room_id) {
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

            if(rooms[room].host && rooms[room].host.id == client_id)
                rooms[room].host = null;
            else if(rooms[room].guest && rooms[room].guest.id == client_id)
                rooms[room].host = null;
        }
        console.log(client_id + " has left");
    }

    this.joinRoom = function(room_id, client) {
        // Check if room exists and join room if it's not full
        if(!this.roomExists(room_id) || this.roomIsFull(room_id)) {
            return;
        }
        rooms[room_id].joinRoom(client);
        console.log(client.id + " has joined room " + room_id);
        return true;
    }
}

exports.RoomManager = RoomManager;