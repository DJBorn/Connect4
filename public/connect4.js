(function() {
    var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        //canvas.style.width='100%';
        //canvas.style.height='100%';
        canvas.width  = canvas.innerWidth;
        canvas.height = canvas.innerHeight;
        canvas.width = document.getElementById('canvas').offsetWidth;
        canvas.height = document.getElementById('canvas').offsetHeight;
        
        drawStuff(); 
    }
    resizeCanvas();

    function drawStuff() {
        var backgroundColor = "rgb(50, 120, 225)";
        var backgroundShade = "rgb(25, 60, 145)";
        ctx.beginPath();
        ctx.shadowBlur=5;
        ctx.shadowColor= backgroundColor;
        ctx.rect(0, 0,canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fill();

        ctx.beginPath();
        ctx.shadowBlur=5;
        ctx.shadowColor= backgroundShade;
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.fillStyle = backgroundShade;
        ctx.fill();

        ctx.beginPath();
        ctx.shadowBlur=5;
        ctx.shadowColor= backgroundColor;
        ctx.arc(105,80,40,0,2*Math.PI);
        ctx.fillStyle = backgroundColor;
        ctx.fill();
    }
})();