/*
* @todo
* accurately place pieces in the board
* 
*/

var Board = function (rows, columns){
    this.board = [];
    this.rows = rows;
    this.columns = columns;
    this.winner = false;
    for(var i = 0; i < rows; i++) {
        this.board[i] = [];
        for(var j = 0; j < columns; j++) {
            this.board[i][j] = 0;
        }
    }
}

Board.prototype.putPiece = function (piece, column) {

    var lastTurnRow;
    var lastTurnColumn; 
    var lastTurnPiece;
    var parent = this; //used to look at parent function board object

    // console.log("Player " + piece + " wanted to put a piece at " + column);

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

            // console.log("Board now looks like:");
            // console.log(this.board);

            this.winner = getWinningPlayer();
            return true; //start next player move
        }     
    }

    //places a piece at the bottom of the board.
    this.board[this.rows - 1][column] = piece;
    lastTurnRow = this.rows-1;
    lastTurnColumn = column;
    lastTurnPiece = piece;
    // console.log("Board now looks like:");
    // console.log(this.board);

    /*  
    * getWinningPlayer()
    * check if most recent move won the game
    * returns: false if no win, or the player (piece) who won
    */
    function getWinningPlayer(){
        var counter = 1; //counts same pieces found in a row
        var increment = 1; //used to increment through the board

        //check up and down for a winning match
        while (parent.board[lastTurnRow - increment] && parent.board[lastTurnRow - increment][lastTurnColumn] === lastTurnPiece){
            // console.log("Found same player piece above.");
            counter++;
            increment++;
        }   
        increment = 1; //reseting the incrementer for the next loop
        while (parent.board[lastTurnRow + increment] && parent.board[lastTurnRow + increment][lastTurnColumn] === lastTurnPiece){
            // console.log("Found same player piece below.");
            counter++;
            increment++;
        }
        increment = 1;
        if (counter >= 4) {
            //player with this piece has won.
            // console.log("Player " + piece + " has won!");
            return piece;
        }
        else {
            // console.log("No vertical win.")
            counter = 1;
        }

        //check left and right for a winning match
        while (parent.board[lastTurnRow][lastTurnColumn - increment] === lastTurnPiece){
            // console.log("Found same player piece left.");
            counter++;
            increment++;
        }   
        increment = 1;
        while (parent.board[lastTurnRow][lastTurnColumn + increment] === lastTurnPiece){
            // console.log("Found same player piece right.");
            counter++;
            increment++;
        }
        increment = 1;
        if (counter >= 4) {
            //player with this piece has won.
            // console.log("Player " + piece + " has won!");
            return piece;
        }
        else {
            // console.log("No horozontal win.")
            counter = 1;
        }

        //check up and left diagonal with down and right diagonal
        while (parent.board[lastTurnRow - increment] && parent.board[lastTurnRow - increment][lastTurnColumn - increment] === lastTurnPiece){
            // console.log("Found same player piece diagonal (up and left).");
            counter++;
            increment++;
        }   
        increment = 1;
        while (parent.board[lastTurnRow + increment] && parent.board[lastTurnRow + increment][lastTurnColumn + increment] === lastTurnPiece){
            // console.log("Found same player piece diagonal (down and right).");
            counter++;
            increment++;
        }
        increment = 1;
        if (counter >= 4) {
            // console.log("Player " + piece + " has Won!");
            return piece;
        }
        else {
            // console.log("No diagonal win. (up and left to down and right)")
            counter = 1;
        }

        //check up and right diagonal with down and left diagonal
        while (parent.board[lastTurnRow - increment] && parent.board[lastTurnRow - increment][lastTurnColumn + increment] === lastTurnPiece){
            // console.log("Found same player piece diagonal (up and right).");
            counter++;
            increment++;
        }   
        increment = 1;
        while (parent.board[lastTurnRow + increment] && parent.board[lastTurnRow + increment][lastTurnColumn - increment] === lastTurnPiece){
            // console.log("Found same player piece diagonal (down and left).");
            counter++;
            increment++;
        }
        increment = 1;
        if (counter >= 4) {
            // console.log("Player " + piece + " has Won!");
            return piece;
        }
        //no win on this turn
        else {
            // console.log("No diagonal win. (up and right to down and left)");
            // console.log("Player " + piece + " did not win with last piece.");
            // console.log(); //line break for easier debugging
            return false;
        }
        
    }

    this.winner = getWinningPlayer();
    return true; //start next player move
}

exports.Board = Board;