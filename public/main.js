// Default board (canvas, rows, columns)
var game_canvas = new GameCanvas(document.getElementById('canvas'));
var server_communicator = new ServerCommunicator();
var input_handler = new InputHandler();
var html_components = new HTMLComponents();
var game_state = 'waiting_for_guest_player';

function copyURL() {
    html_components.copyURL();
}

server_communicator.addListener('showShareURLMessage', function(flag) {
    html_components.showCopyURL(flag);
});

function drawCanvas() {
    game_canvas.drawCanvas();
    window.requestAnimationFrame(drawCanvas);
}

window.requestAnimationFrame(drawCanvas);

// Add a new listener to update the board when the server board model has changed
server_communicator.addListener('updateBoard', function(data) {
    game_canvas.setBoard(data);
    game_canvas.resizeCanvas();
});

// Add a listener to resize the canvas and board when the screen is resized
input_handler.addListener('resize', 'resizeBoard', game_canvas.resizeCanvas);

// Temporary timeout
setTimeout(function(){

// Add a mouseup event listener for each column on the connect 4 board
for(var i = 0; i < game_canvas.getNumberOfColumns(); i++) {
    input_handler.addListener('mouseup', 'putPieceColumn' + i, server_communicator.putPiece, [i], game_canvas.getColumnRegion, [i]);
}

}, 1000);
