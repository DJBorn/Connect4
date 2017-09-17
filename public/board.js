/*
* @todo
* make the socket emit the correct column to the server.
*/

var Board = function(new_canvas, rows = 6, columns = 7) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellLength;
    var boardWidth;
    var boardHeight;
    var backgroundColor = "rgb(95, 160, 255)"; //board color
    var backgroundShade = "rgb(25, 60, 145)"; //hole color
    var piece1Color = "rgb(245, 328, 158)"; 
    var piece2Color = "rgb(240, 101, 67)";
    var player1 = 1;
    var player2 = 2;
    var you;
    var board = [[]];
    var horizontalOffset;
    var verticalOffset;

    //setInterval(function() {socket.emit('putPiece', 3);}, 5000);

    // Initialize empty board
    for(var i = 0; i < rows; i++) {
        board[i] = [];
        for(var j = 0; j < columns; j++)
            board[i][j] = 0;
    }

    // setInterval(function() {
    //     board[Math.floor(Math.random()*rows)][Math.floor(Math.random()*columns)] = Math.floor(Math.random()*2)+1;
    // }, 200)

    resizeCanvas();

    // Resize the canvas whenever the window size changes
    window.addEventListener('resize', resizeCanvas, false);

    // Gets the current cursor coodinates 
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    // Listens for a click. Returns the region clicked to the console.
    window.addEventListener('click', function(evt) {

        // gets the cursor postion
        var mousePos = getMousePos(canvas, evt);

        /* debugging
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
        */
        
        var columnLength = boardWidth / (cellLength*columns);

        // An array that is filled with the max values of each region
        var regions = [];
        for (var i = 0; i < columns; i++) {
            regions[i] = (columnLength * i) * cellLength + horizontalOffset;
            //console.log(regions[i]);
        }
        // debugging
        //console.log(regions);

        // Determines which region to return based on the cursor coordinates
        for (var i = 0; i < columns; i++) {
            if (mousePos.x < regions[i + 1] && mousePos.x > regions[i]) {
                console.log("clicked in region: " + i); 
                socket.emit('putPiece', i);
            }
            else if (i === columns-1 && mousePos.x >= regions[i] && mousePos.x <= regions[i] + cellLength) { 
                console.log("clicked in region: " + i);
                socket.emit('putPiece', i);
            }
        }
    }, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height  = window.innerHeight;
        cellLength = Math.min(canvas.height/rows, canvas.width/columns);
        boardHeight = cellLength*rows;
        boardWidth = cellLength*columns;

        horizontalOffset = (canvas.width - boardWidth)/2;
        verticalOffset = canvas.height - boardHeight;
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

        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < columns; j++) {
                if (board[i][j] === player1) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece1Color);
                }
                else if (board[i][j] === player2) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece2Color);
                }
                else {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, backgroundShade);
                }
            }
        }
    }
};
