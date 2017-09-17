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
    for (var i = 0; i < this.rows; i++) {
        //console.log("");
        for (var j = column; j <= column; j++) {
            if (this.board[0][j] === 1) {
                console.log("Column is full");
                return;
            }
            else if (this.board[0][j] === 2) {
                console.log("Column is full");
                return;
            }
            else if (this.board[i][j] === 1) {
                //idon'tknowhatshappeninganymore
                console.log("Board now looks like:");
                console.log(this.board);
            }
            else {
                this.board[i][j] = piece;
                console.log("Board now looks like:");
                console.log(this.board);
                return;
                //console.log("");
            }
        }
    }
}
exports.Board = Board;