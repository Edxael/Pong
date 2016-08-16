

		var canvas;
        var canvasContext;
        var ballX = 50;
        var ballY = 50;
        var ballSpeedX = 10;
        var ballSpeedY = 4;
        var paddle1Y = 250;
        var paddle2Y = 250;
        const PADDLE_THICKNESS = 10;
        const PADDLE_HEIGHT = 100;
        var player1Score = 0;
        var player2Score = 0;
        const WINING_SCORE = 3;
        var showingWinScreen = false;
        var x = 1;
      




        // Function for the button to start the game
        function myFunction() {	
   			x = document.getElementById("myBtn").value;
    		document.getElementById("demo").innerHTML = x;
		}





        // here we calculate the current position of the mouse in the canvas
        function calculateMousePos(evt) {
        	var rect = canvas.getBoundingClientRect();
        	var root = document.documentElement;
        	var mouseX = evt.clientX - rect.left - root.scrollLeft;
        	var mouseY = evt.clientY - rect.top - root.scrollTop;
        	return {
        		x:mouseX,
        		y:mouseY
        	} ;       	
        }






        // here we set the scores back ot "0" 
        function handleMouseClick(evt){
        	if (showingWinScreen) {
        		player1Score = 0;
        		player2Score = 0;
        		showingWinScreen = false;
        	}
        }
        





        // this function loads all the code before execute it
        window.onload = function() {
        	canvas = document.getElementById('gameCanvas');
        	canvasContext = canvas.getContext('2d');
        	
        	// here we set the interval "speed" how fast the code will be executed.
        	var framesPerSecond = 40;
        	setInterval(function() {

        			moveEverything();
        			drawEverything();	
        		}, 1000/framesPerSecond);

        	// this event is when the mouce do Click
        	canvas.addEventListener('mousedown', handleMouseClick);

        	// here is the mouse imput for controling the paddle 
        	// calculates the mouse position and send it to the "paddle1Y" variable
	        canvas.addEventListener('mousemove',
	        	function(evt) {
	        		var mousePos = calculateMousePos(evt);
	        		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);        
	        	}
	        );
        }







        // this function reset the ball 
        function ballReset(){
        	if (player1Score >= WINING_SCORE || player2Score >= WINING_SCORE) {

        		showingWinScreen = true;
        	}

        	ballSpeedX = -ballSpeedX;
        	ballX = canvas.width/2;
        	ballY = canvas.height/2;
        }







        // this will make the computer move the padel in the right
        function computerMovement(){
        	var paddle2YCenter = paddle2Y +(PADDLE_HEIGHT/2);
        	if (paddle2YCenter < ballY - 35) {
        		paddle2Y += 6;
        	}
        	else {
        		if (paddle2YCenter > ballY + 35) {
        		paddle2Y -= 6;
        		}
        	}
        }
        





        // this function moves the ball
        function moveEverything() {
        	// will go out of exectuion if some one won
        	if(showingWinScreen == true){
        		return;
        	}

        	if(x == 1){
        		return;
        	}

        	computerMovement();

        	ballX = ballX + ballSpeedX;
        	ballY = ballY + ballSpeedY;
        	
        	// what happen whe the ball hit the left side
        	if(ballX < 0) {
        		// if hist withing the body of the paddle bouce the ball
        		if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)){
        			ballSpeedX = -ballSpeedX;

        			// this will give a value for how far from the center of the paddle the ball hits
        			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);

        			// this will change the speed on the Y axis
        			ballSpeedY = deltaY * 0.35;
        		}

        		// if hits outside the body of the paddle --> restart the ball
        		else {
        			
        			player2Score ++; // Must be before ballReset()
        			ballReset();
        		}
        	}

        	// what happen whe the ball hit the right side
        	if(ballX > canvas.width) {
        		// if hist withing the body of the paddle bouce the ball
        		if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)){
        			ballSpeedX = -ballSpeedX;

        			// this will give a value for how far from the center of the paddle the ball hits
        			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);

        			// this will change the speed on the Y axis
        			ballSpeedY = deltaY * 0.35;
        		}

        		// if hits outside the body of the paddle --> restart the ball
        		else {
        			
        			player1Score ++; // Must be before ballReset()
        			ballReset();
        		}
        	}

        	if(ballY < 0) {
        		ballSpeedY = -ballSpeedY;
        	}

        	if(ballY > canvas.height) {
        		ballSpeedY = -ballSpeedY;
        	}
        }





        function drawNet(){
        	for(var i=0; i<canvas.height; i+=40){
        		colorRect(canvas.width/2-1, i , 2, 20, 'white');
        	}
        }





        function drawEverything() {

        		// will go out of exectuion if some one won

        			// this will paint black the previous text 
        			canvasContext.fillStyle = 'black';
        			// here we put the text for the score
        			canvasContext.font = "20px Verdana";
        			canvasContext.fillText("YOU : " + player1Score , 150, 25);
        			canvasContext.fillText("Machine : " + player2Score , 550, 25);


        		    // next line will give the color to the text
        	    	canvasContext.fillStyle = 'white';
        			// here we put the text for the score
        			canvasContext.font = "20px Verdana";
        			canvasContext.fillText("YOU : " + player1Score , 150, 125);
        			canvasContext.fillText("Machine : " + player2Score , 550, 125);





        	    if(showingWinScreen == true){

        	    	if (player1Score >= WINING_SCORE) {

        	    		// next line will give the color to the text
        	    		canvasContext.fillStyle = 'yellow';
        	    		// this line print the text and the location of the text
        	    		canvasContext.fillText(" YOU WIN " , 348, 70);


        	    		// next line will give the color to the text
        	    		canvasContext.fillStyle = 'red';
        	    		// this line print the text and the location of the text
        	    		canvasContext.fillText(" Click HERE to Continue " , 300, 100);
        	    		showingWinScreen = true;
        				return;
        	    	}

        	    	else if (player2Score >= WINING_SCORE) {

        	    		// next line will give the color to the text
        	    		canvasContext.fillStyle = 'yellow';
        	    		// this line print the text and the location of the text
        	    		canvasContext.fillText(" YOU LOSE - Don't Cry" , 300, 70);

        	    		// next line will give the color to the text
        	    		canvasContext.fillStyle = 'red';
        	    		// this line print the text and the location of the text
        	    		canvasContext.fillText(" Click HERE to Continue " , 279, 100);
        	    		showingWinScreen = true;
        				return;
        	    	}
        		}



        	// next line blanks out the screen with black
        	colorRect(0,0,canvas.width,canvas.height,'black');

        	// here Im calling the function to draw the net. 
        	drawNet()
        
        	// this is Left player paddle
        	colorRect(4,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'orange');

        	// this is Right player paddle
        	colorRect(canvas.width - 15 ,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'orange');
        
        	// next line draws the ball
        	colorCircle(ballX, ballY, 10, 'blue');


        	// next line will give the color to the text
        	    	canvasContext.fillStyle = 'white';
        	// here we put the text for the score
        	canvasContext.font = "20px Verdana";
        	canvasContext.fillText("YOU : " + player1Score , 150, 25);
        	canvasContext.fillText("Machine : " + player2Score , 550, 25);
        }




        
        // this function creates a circle to be the ball
        function colorCircle(centerX, centerY, radius, drawColor) {
        	canvasContext.fillStyle = drawColor;
        	canvasContext.beginPath();
        	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
        	canvasContext.fill();
        }





        function colorRect(leftX,topY, width,height, drawColor) {
        	canvasContext.fillStyle = drawColor;
        	canvasContext.fillRect(leftX,topY, width,height);
        }
        
        
        
        