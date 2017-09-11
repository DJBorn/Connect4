var board = new Board(document.getElementById('canvas'));

// Redraw canvas at 50 fps (1000/50 ms)
this.updateGame = setInterval(update, 20);
function update() {
    board.clear();
    board.drawBoard();
}