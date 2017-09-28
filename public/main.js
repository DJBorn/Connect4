// Default board (canvas, rows, columns)
var game_canvas = new GameCanvas(document.getElementById('canvas'));
var server_communicator = new ServerCommunicator();
var input_handler = new InputHandler();
var html_components = new HTMLComponents();
var game_state = null;

function copyURL() {
    html_components.copyURL();
}

server_communicator.addListener('updateGameState', function(data) {
    game_state = data;
})

server_communicator.addListener('showShareURLMessage', function(flag) {
    html_components.showCopyURL(flag);
});

server_communicator.addListener('showResetButton', function(data) {
    // html_componenets.show
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
    html_components.resizeComponents(game_canvas.getBoardCoordinates());
});

// Add a listener to resize the canvas and board when the screen is resized
input_handler.addListener('resize', 'resizeBoard', function() {
    game_canvas.resizeCanvas();
    html_components.resizeComponents(game_canvas.getBoardCoordinates());
});

// Temporary timeout
setTimeout(function(){
    // Add listeners for columns
    for(var i = 0; i < game_canvas.getNumberOfColumns(); i++) {
        // Helper function that returns whether the mouse position is within a region
        function isInRegion(evt, region) {
            return evt.clientX > region.x && evt.clientX < region.x + region.width && 
            evt.clientY > region.y && evt.clientY < region.y + region.height
        }

        // Add listener for mouseup events for putting pieces in specific columns
        input_handler.addListener('mouseup', 'putPieceColumn' + i, function(evt, column) {
            if(isInRegion(evt, game_canvas.getColumnRegion(column)))
                server_communicator.putPiece(column);
        }, [i]);

        // Add listeners for columns that are being hovered over for highlighting
        input_handler.addListener('mousemove', 'hoverHighlight' + i, function(evt, column) {
            // Use game_canvas.setDisplayHighlight(column, value) to set boolean values to indicate whether to highlight that column or not

        }, [i]);
    }
}, 1000);