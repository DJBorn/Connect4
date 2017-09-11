var Board = function(new_canvas) {
    var canvas = new_canvas;
    var ctx = canvas.getContext('2d');
    var cellWidth;
    var cellHeight;
    var backgroundColor = "rgb(50, 120, 225)";
    var backgroundShade = "rgb(25, 60, 145)";
    
    resizeCanvas();

    // Resize the canvas whenever the window size changes
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width  = canvas.innerWidth;
        canvas.height = canvas.innerHeight;
        canvas.width = document.getElementById('canvas').offsetWidth;
        canvas.height = document.getElementById('canvas').offsetHeight;
        cellWidth = this.canvas.width/7;
        cellHeight = this.canvas.height/6;
    }

    this.drawBoard = function() {
        // Draw background

        // Draw holes
        drawHoles();
    }

    this.clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw a hole at x and y, with the radius of the hole scale between 0-1 where 1 is the size of the cell
    function drawHoles(x, y, radiusScale){
        function drawHole(x, y) {
            ctx.beginPath();
            ctx.shadowBlur=5;
            ctx.shadowColor= backgroundColor;
            ctx.arc(x,y,50,0,2*Math.PI);
            ctx.fillStyle = backgroundColor;
            ctx.fill();
        }

        for(var i = 0; i < 7; i++) {
            for(var j = 0; j < 6; j++) {
                drawHole(i*cellWidth, j*cellHeight)
            }
        }
    }
};
