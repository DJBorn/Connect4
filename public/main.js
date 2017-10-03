// Default board (canvas, rows, columns)
var game_canvas = new GameCanvas(document.getElementById('canvas'));
var server_communicator = new ServerCommunicator();
var input_handler = new InputHandler();
var html_components = new HTMLComponents();
var game_state = "waiting";

function copyURL() {
    html_components.copyURL();
}

function resetGame() {
    server_communicator.resetGame();
}

server_communicator.addListener('updateGameState', function(data) {
    game_state = data;
    if(game_state == "waiting") {
        html_components.showCopyURL(true);
    }
    else {
        html_components.showCopyURL(false);
    }
    if(game_state == "your_turn") {
        setupInGameHandlers();
        game_canvas.setPulse(true);
        game_canvas.setArrows(true);
    }
    else {
        turnOffGameHandlers();
        game_canvas.setPulse(false);
        game_canvas.setArrows(false);
    }
    if (game_state == "winner" || game_state == "loser") {
        html_components.showResetGameButton(true);
    }
    else {
        html_components.showResetGameButton(false);
    }
})

if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
        };
    } )();
}

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

function turnOffGameHandlers() {
    for(var i = 0; i < game_canvas.getNumberOfColumns(); i++) {
        input_handler.disableEvent('mouseup', 'putPieceColumn' + i);
        input_handler.disableEvent('mousemove', 'hoverHighlight' + i);
        input_handler.disableEvent('touchstart', 'touchStartHighlight' + i);
        input_handler.disableEvent('touchmove', 'touchMoveHighlight' + i);
        input_handler.disableEvent('touchend', 'touchEndHighlight' + i);
    }
}

function setupInGameHandlers() {
    // Add listeners for columns
    for(var i = 0; i < game_canvas.getNumberOfColumns(); i++) {
        // Helper function that returns whether the mouse position is within a region
        function isInRegion(evt, region) {
            return evt.clientX > region.x && evt.clientX < region.x + region.width && 
            evt.clientY > region.y && evt.clientY < region.y + region.height
        }

        // Add listener for click events for putting pieces in specific columns
        input_handler.addListener('mouseup', 'putPieceColumn' + i, function(evt, column) {
            if(isInRegion(evt, game_canvas.getColumnRegion(column)))
                server_communicator.putPiece(column);
            game_canvas.setDisplayHighlight(column, false);
        }, [i]);

        // Mouse move and mouse down listeners
        // Highlights the column 
        input_handler.addListener('mousemove', 'hoverHighlight' + i, function(evt, column) {
            // Use game_canvas.setDisplayHighlight(column, value) to set boolean values to indicate whether to highlight that column or not
            if(isInRegion(evt, game_canvas.getColumnRegion(column)))
                game_canvas.setDisplayHighlight(column, true);
            else
                game_canvas.setDisplayHighlight(column, false);
        }, [i]);

        // Highlight the column when finger first touches the screen
        input_handler.addListener('touchstart', 'touchStartHighlight' + i, function(evt, column) {
            // Use game_canvas.setDisplayHighlight(column, value) to set boolean values to indicate whether to highlight that column or not
            if(isInRegion(evt.changedTouches[0], game_canvas.getColumnRegion(column)))
                game_canvas.setDisplayHighlight(column, true);
        }, [i]);

        // Highlight a column when finger moves into a column, and remove any highlights on other columns
        input_handler.addListener('touchmove', 'touchMoveHighlight' + i, function(evt, column) {
            // Use game_canvas.setDisplayHighlight(column, value) to set boolean values to indicate whether to highlight that column or not
            if(isInRegion(evt.changedTouches[0], game_canvas.getColumnRegion(column)))
                game_canvas.setDisplayHighlight(column, true);
            else
                game_canvas.setDisplayHighlight(column, false);
        }, [i]);
        
        // Remove highlight when finger releases from the screen and put a piece down (prevent default mousemove/mouseup events)
        input_handler.addListener('touchend', 'touchEndHighlight' + i, function(evt, column) {
            evt.preventDefault();
            game_canvas.setDisplayHighlight(column, false);
            if(isInRegion(evt.changedTouches[0], game_canvas.getColumnRegion(column)))
                server_communicator.putPiece(column);
        }, [i]);
    }
}