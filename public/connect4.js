// Default board
//var board = new Board(document.getElementById('canvas'));

// Custom board
var cBoard = new customBoard(document.getElementById('canvas'),14,10);

// Redraw canvas at 50 fps (1000/50 ms)
this.updateGame = setInterval(update, 20);
function update() {
    // board.clear();
    // board.drawBoard();

    cBoard.clear();
    cBoard.drawBoard();
}