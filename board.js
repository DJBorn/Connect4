var Board = function (rows, columns){
    this.board = [];
    this.rows = rows;
    this.columns = columns;
    for(var i = 0; i < rows; i++) {
        this.board[i] = [];
        for(var j = 0; j < columns; j++) {
            this.board[i][j] = 0;
        }
    }
}

Board.prototype.putPiece = function (piece, column) {
    console.log("Player " + piece + " wanted to put a piece at " + column);

    
    console.log("Board now looks like:");
    console.log(this.board);
}
exports.Board = Board;