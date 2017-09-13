var Board = function(new_canvas, rows = 6, columns = 7) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellLength;
    var boardRows = rows;
    var boardCols = columns;
    var boardWidth;
    var boardHeight;
    var backgroundColor = "rgb(50, 120, 225)"; //board color
    var backgroundShade = "rgb(25, 60, 145)"; //hole color
    

    resizeCanvas();

    // Resize the canvas whenever the window size changes
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height  = window.innerHeight;
        cellLength = Math.min(canvas.width/boardCols, canvas.height/boardRows);
        boardWidth = cellLength*boardCols;
        boardHeight = cellLength*boardRows;
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
        function drawHole(x, y, radiusScale) {
            var radius = cellLength/2 * radiusScale;
            x = x + cellLength/2;
            y = y + cellLength/2;

            ctx.beginPath();
            ctx.shadowBlur=5;
            ctx.shadowColor= backgroundColor;
            ctx.arc(x, y, radius, 0, 2*Math.PI);
            ctx.fillStyle = backgroundShade;
            ctx.fill();
        }

        for(var i = 0; i < boardCols; i++) {
            for(var j = 0; j < boardRows; j++) {
                drawHole(i*cellLength + canvas.width/2 - boardWidth/2, j*cellLength + canvas.height - boardHeight, .1);
            }
        }
    }
};
