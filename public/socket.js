var socket = io.connect('http://localhost:8080', { query: 'room_id=' + window.location.pathname.substr(1)});
// socket.on('role_assign', function (data) {
//   console.log("You have joined as a " + data);
// // socket.emit('my other event', { my: 'data' });
// });
