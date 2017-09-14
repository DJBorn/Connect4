var Board = function(new_canvas, rows = 6, columns = 7) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellLength;
    var boardWidth;
    var boardHeight;
    var backgroundColor = "rgb(50, 120, 225)"; //board color
    var backgroundShade = "rgb(25, 60, 145)"; //hole color
    var piece1Color = "rgb(245, 328, 158)"; 
    var piece2Color = "rgb(240, 101, 67)";
    var player1 = 1;
    var player2 = 2;
    var board = [[]];

    // Initialize empty board
    for(var i = 0; i < rows; i++) {
        board[i] = [];
        for(var j = 0; j < columns; j++)
            board[i][j] = 0;
    }

    resizeCanvas();

    // Resize the canvas whenever the window size changes
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height  = window.innerHeight;
        cellLength = Math.min(canvas.height/rows, canvas.width/columns);
        boardHeight = cellLength*rows;
        boardWidth = cellLength*columns;
    }

    this.drawBoard = function() {
        // Draw background
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fill();

        // Draw holes
        drawHoles();
    }

    this.clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

        var horizontalOffset = (canvas.width - boardWidth)/2;
        var verticalOffset = canvas.height - boardHeight;

        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < columns; j++) {
                if (board[i][j] === 1) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, piece1Color);
                }
                else if (board[i][j] === 2) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, piece2Color);
                }
                else {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, backgroundShade);
                }
            }
        }
    }
};
