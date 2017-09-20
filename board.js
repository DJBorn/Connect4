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

    var winner;
    var lastTurnRow;
    var lastTurnColumn; 
    var lastTurnPiece;

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

            lastTurnRow = i-1;
            lastTurnColumn = column;
            lastTurnPiece = piece;

            console.log("Board now looks like:");
            console.log(this.board);
            return true;
        }     
    }

    //places a piece at the bottom of the board.
    this.board[this.rows - 1][column] = piece;
    lastTurnRow = this.rows-1;
    lastTurnColumn = column;
    lastTurnPiece = piece;
    console.log("Board now looks like:");
    console.log(this.board);
    //return true;

    /* @todo 
    * getWinnerPlayer()
    * check if move won the game
    * returns: false if no win, or the player who won
    */
    function getWinningPlayer(){
        var counter = 1;

        //check up and down for a winning match
        while (this.board[this.lastTurnRow - 1] && this.board[this.lastTurnRow - 1][this.lastTurnColumn] === this.lastTurnPiece){
            console.log("Found same player piece above.");
            counter++;
        }   
        /*
        while (this.board[lastTurnRow + 1] && this.board[lastTurnRow + 1][lastTurnColumn] === lastTurnPiece){
            console.log("Found same player piece below.");
            counter++;
        }
        if (counter >= 4) {
            //player with this piece has won.
            console.log("Player " + piece + " has won!");
            return piece;
        }
        else {
            console.log("No vertical win.")
            counter = 1;
        }

        //check left and right for a winning match
        while (this.board[lastTurnRow][lastTurnColumn - 1] === lastTurnPiece){
            console.log("Found same player piece left.");
            counter++;
        }   
        while (this.board[lastTurnRow][lastTurnColumn + 1] === lastTurnPiece){
            console.log("Found same player piece right.");
            counter++;
        }
        if (counter >= 4) {
            //player with this piece has won.
            console.log("Player " + piece + " has won!");
            return piece;
        }
        else {
            console.log("No horozontal win.")
            counter = 1;
        }

        //check up and left diagnol with down and right diagnol
        while (this.board[lastTurnRow-1] && this.board[lastTurnRow-1][lastTurnColumn - 1] === lastTurnPiece){
            console.log("Found same player piece diagnol (up and left).");
            counter++;
        }   
        while (this.board[lastTurnRow+1] && this.board[lastTurnRow+1][lastTurnColumn + 1] === lastTurnPiece){
            console.log("Found same player piece diagnol (down and right).");
            counter++;
        }
        if (counter >= 4) {
            //player with this piece has won.
            console.log("Player " + piece + " has Won!");
            return piece;
        }
        else {
            counter = 1;
        }

        //check up and right diagnol with down and left diagnol
        while (this.board[lastTurnRow - 1] && this.board[lastTurnRow - 1][lastTurnColumn + 1] === lastTurnPiece){
            console.log("Found same player piece diagnol (up and right).");
            counter++;
        }   
        while (this.board[lastTurnRow + 1] && this.board[lastTurnRow + 1][lastTurnColumn - 1] === lastTurnPiece){
            console.log("Found same player piece diagnol (down and left).");
            counter++;
        }
        if (counter >= 4) {
            //player with this piece has won.
            console.log("Player " + piece + " has Won!");
            return piece;
        }
        //no win on this turn
        else {
            console.log("Player " + piece + " did not win with last piece.")
            return false;
        }
        */
    }

    getWinningPlayer();
    
}

exports.Board = Board;