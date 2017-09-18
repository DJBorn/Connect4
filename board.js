/*
* @todo
* accurately place pieces in the board
* 
*/

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

    //check if column is full
    if (this.board[0][column] === 1 || this.board[0][column] === 2) {
        console.log("Column is full");
        return false;
    }

    //check if column has a piece in it, places piece above the last piece
    for (var i = 0; i < this.rows; i++) {       
        if (this.board[i][column] === 1 || this.board[i][column] === 2) {
            this.board[i-1][column] = piece;
            console.log("Board now looks like:");
            console.log(this.board);
            return true;
        }     
    }

    //places a piece at the bottom of the board.
    this.board[this.rows - 1][column] = piece;
    console.log("Board now looks like:");
    console.log(this.board);
    return true;

    /* @todo 
    *check if move won the game
    */
}
exports.Board = Board;