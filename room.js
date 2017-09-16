var Room = function (room_id){
    this.room_id = room_id;
    this.host = null;
    this.guest = null;
}

Room.prototype.isFull = function () {
    return this.host && this.guest;
}

Room.prototype.joinRoom = function(client) {
    // Try to fill host position first
    if(!this.host)
        this.host = {
            id: client.id,
            socket: client
        };
    // Then try to fill the guest position
    else if(!this.guest)
        this.guest = {
            id: client.id,
            socket: client
        };
}

exports.Room = Room;