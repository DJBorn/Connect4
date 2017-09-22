var GameCanvas = function(new_canvas) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellLength;
    var boardWidth;
    var boardHeight;
    var backgroundColor = "rgb(95, 160, 255)"; //board color
    var backgroundShade = "rgb(50, 120, 225)"; //hole color
    var piece1Color = "rgb(245, 328, 158)"; 
    var piece2Color = "rgb(240, 101, 67)";
    var player1 = 1;
    var player2 = 2;
    var board = null;
    var rows = 0;
    var columns = 0;
    var horizontalOffset;
    var verticalOffset;

    this.setBoard = function(new_board) {
        board = new_board;
    }

    this.getNumberOfColumns = function () {
        return columns;
    }

    /* Given the column (0 <= column < columns), return an object with the x, y, width, and height of that column
        E.g. {
            x: 40,
            y: 40,
            width: 200,
            height: 800
        }
    */
    this.getColumnRegion = function(column) {

    }

    this.resizeCanvas = function() {
        // Set the number of rows and columns
        if(board)
            rows = board.length;
        if(board && board[0])
            columns = board[0].length;

        // Set the canvas width and height
        canvas.width = window.innerWidth;
        canvas.height  = window.innerHeight;

        // Set the individual cell lengths
        cellLength = Math.min(canvas.height/rows, canvas.width/columns);

        // Set the board height and width
        boardHeight = cellLength*rows;
        boardWidth = cellLength*columns;

        // Set the x and y position of the board
        horizontalOffset = (canvas.width - boardWidth)/2;
        verticalOffset = canvas.height - boardHeight;
    }

    this.drawCanvas = function() {
        drawBoard();
    }

    function drawBoard() {
        // Draw background
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fill();

        // Draw holes
        drawHoles();
    }

    function drawHoles(x, y){
        // Draw a hole at x and y, with the radius of the hole scale between 0-1 where 1 is the size of the cell
        function drawHole(x, y, radiusScale, color) {
            var radius = cellLength/2 * radiusScale;
            x = x + cellLength/2;
            y = y + cellLength/2;

            ctx.beginPath();
            ctx.arc(y, x, radius, 0, 2*Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < columns; j++) {
                if (board[i] && board[i][j] === player1) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece1Color);
                }
                else if (board[i] && board[i][j] === player2) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece2Color);
                }
                else {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, backgroundShade);
                }
            }
        }
    }
};
