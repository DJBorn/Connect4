var GameCanvas = function(new_canvas) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellLength;
    var boardWidth;
    var boardHeight;
    var fontSize = 20;
    var backgroundColor = "rgb(95, 160, 255)"; //board color
    var backgroundShade = "rgb(40, 100, 180)"; //hole color
    var piece1Color = "rgb(245, 328, 158)"; 
    var piece2Color = "rgb(240, 101, 67)";
    var player1 = 1;
    var player2 = 2;
    var board = null;
    var rows = 0;
    var columns = 0;
    var horizontalOffset;
    var verticalOffset;
    var displayHighlight = [];
    var pulse;

    var showWaitMessage = false;

    this.setWaitMessage = function(val) {
        showWaitMessage = val;
    }

    this.setPulse = function(val) {
        pulse = val;
    }

    this.createPlayerAnimation = function (player, radiusScale){
        return {
            piece: player,
            color: player == 1 ? piece1Color : piece2Color,
            radiusScale: radiusScale,
            curRadius: 0,
            acceleration: 0,
            draw: function(x, y) {
                this.radius = cellLength/2 * this.radiusScale;
                
                var accelerationChange = 3;
                var resistance = .9;
                if(this.curRadius > this.radius)
                accelerationChange *= -1;
                this.acceleration += accelerationChange;
                if(this.acceleration > 0)
                    this.acceleration -= resistance;
                else
                    this.acceleration += resistance;

                if(Math.abs(this.curRadius - this.radius) < 2 && Math.abs(this.acceleration) < accelerationChange) {
                    this.acceleration = 0;
                }
                this.curRadius += this.acceleration;

                x = x + cellLength/2;
                y = y + cellLength/2;

                ctx.beginPath();
                ctx.arc(y, x, this.curRadius, 0, 2*Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
    }

    this.createHoleAnimation = function (piece, radiusScale) {
        return {
            piece: piece,
            color: backgroundShade,
            radiusScale: radiusScale,
            opacity: 0,
            opacityChange: 0,
            draw: function(x, y, pulse) {
                this.radius = cellLength/2 * this.radiusScale;
                var rate = 0.01;
                if(pulse) {
                    if(this.opacity <= 0)
                        this.opacityChange = rate;
                    else if(this.opacity >= 0.8)
                    this.opacityChange = -rate;
                }
                else if(this.opacity >= 0)
                    this.opacityChange = -rate;
                else 
                    this.opacityChange = 0;
                    
                this.opacity += this.opacityChange;

                var pulseColor = "rgba(120, 210, 120, " + this.opacity + ")";

                x = x + cellLength/2;
                y = y + cellLength/2;

                ctx.beginPath();
                ctx.arc(y, x, this.radius, 0, 2*Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();

                ctx.arc(y, x, this.radius+1, 0, 2*Math.PI);
                ctx.fillStyle = pulseColor;
                ctx.fill();
            }
        }
    }

    this.setBoard = function(new_board) {
        if(!board)
            board = [];
        for(var i = 0; i < new_board.length; i++) {
            if(!board[i])
                board[i] = [];
            for(var j = 0; j < new_board[0].length; j++) {
                // Check if it's a player piece
                if(new_board[i][j] === 1 || new_board[i][j] === 2) {
                    // Create a new animation if nothing exists in that slot yet or the object is a player piece
                    if(!board[i][j] || (board[i][j].piece != 1 && board[i][j].piece != 2))
                        board[i][j] = this.createPlayerAnimation(new_board[i][j], 0.8);
                } 
                else if(!board[i][j] || board[i][j].piece != 0)
                    board[i][j] = this.createHoleAnimation(new_board[i][j], 0.1);
            }
        }
        //board = new_board;
    }

    this.setDisplayHighlight = function(index, value) {
        displayHighlight[index] = value;
    }

    this.getNumberOfColumns = function () {
        return columns;
    }

    this.getBoardCoordinates = function() {
        return {
            x: horizontalOffset,
            y: verticalOffset,
            width: boardWidth,
            height: boardHeight
        }
    }

    // Given the column, return an object with the x, y, width, and height of that column
    this.getColumnRegion = function(column) {
        return {
            x : cellLength * column + horizontalOffset,
            y : verticalOffset,
            width : cellLength,
            height : boardHeight
        };
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
        verticalOffset = (canvas.height - boardHeight)/2;

        fontSize = boardWidth/15;
    }

    this.drawCanvas = function() {
        drawBoard();

        //gets the column region and draws the highlight
        for(let i = 0; i < columns; i++) {
            if(displayHighlight[i])
             this.drawHighlight(this.getColumnRegion(i));
        }

        // Draw wait message if waiting for player
       // if (showWaitMessage)
         //   drawMessage("Share your URL to play");
    }

    
    this.drawHighlight = function(columnRegion) {
        ctx.beginPath();
        ctx.rect(columnRegion.x, columnRegion.y, columnRegion.width, boardHeight);
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fill();
    }

    function drawMessage(string) {
        ctx.font = fontSize + "px Josefin Sans";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(string, canvas.width/2, verticalOffset + boardHeight/2);
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
                board[i][j].draw(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, pulse);
                /*
                if (board[i] && board[i][j] === player1) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece1Color);
                }
                else if (board[i] && board[i][j] === player2) {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .8, piece2Color);
                }
                else {
                    drawHole(i*cellLength + verticalOffset, j*cellLength + horizontalOffset, .1, backgroundShade);
                }*/
            }
        }
    }
};
