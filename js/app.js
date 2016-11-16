var canvas = document.getElementById("gallows");
var context = canvas.getContext("2d");
var score = 0;
var words;
var currentWord = "";
var blanks = "";
var message = $("#message");

function drawStage(){
	context.moveTo(200, 150);
	context.lineTo(200, 100);

	context.lineTo(400, 100);
	context.lineTo(400, 300);

	context.moveTo(100, 300);
	context.lineTo(500, 300);
	context.stroke();
}



function newGame(){
	let numOfWords = words.length;
	let random = Math.random() * numOfWords;
	currentWord = words[random];
	blanks = "";
	for(var i = 0; i < currentWord.length; i++){
		blanks += "_";
	}
	context.clearRect(0,0, canvas.width, canvas.height);
	drawStage();
	$("#newGame").prop("disabled", true);
	$("#guess").val("");
}

// Call when win condition is fulfilled
function winGame(){
	message.html("You won! Congratulations!");
}

// Call when you lost
function gameOver(){
	message.html("Game Over");
}

// Check submission
function checkSubmission(submitted){

	function scoreUp(){
		score++;
		drawLimb();
	}

	// Check if the player guessed the entire word
	if(submitted.length > 1){
		if(currentWord === submitted){
			winGame();
		} else {
			scoreUp();
		}
	} else {
		// Check the word for the letter submitted
		if(currentWord.indexOf(submitted) > -1){
			// Change instances of letter in blanks variable
			let newBlank = [];
			for(var i = 0; i < currentWord.length; i++){
				if(currentWord[i] === submitted)
					newBlank.push(submitted);
				else 
					newBlank.push("_");

				blanks = newBlank;
			}
		} else {
			scoreUp();
		}
	}
}

// Decide which limb to draw based on score
function drawLimb(){

	// The functions that manipulate the canvas
	function drawHead(){
		context.beginPath();
		context.arc(200, 170, 20, 0, 2*Math.PI);
		context.stroke();
	}

	function drawBody(){
		context.moveTo(200, 190);
		context.lineTo(200, 240);
		context.stroke();
	}

	function drawLeftArm(){
		context.moveTo(200, 200);
		context.lineTo(160, 180);
		context.stroke();
	}

	function drawRightArm(){
		context.moveTo(200, 200);
		context.lineTo(240, 180);
		context.stroke();
	}

	function drawLeftLeg(){
		context.moveTo(200, 240);
		context.lineTo(180, 290);
		context.stroke();
	}

	function drawRightLeg(){
		context.moveTo(200, 240);
		context.lineTo(220, 290);
		context.stroke();
	}

	// Run everything through a switch to figure out what limb to draw
	switch(score){
		case 1:
			drawHead();
			break;
		case 2:
			drawBody();
			break;
		case 3:
			drawLeftArm();
			break;
		case 4:
			drawRightArm();
			break;
		case 5:
			drawLeftLeg();
			break;
		case 6:
			drawRightLeg();
			gameOver();
	}
}


// Event Code
$(document).ready(function(){
	newGame();
	$.getJSON("json/words.json", function(data){
		words = [];
		words = data;
	});

	$("#submit").on("click", function(){
		let submission = $("#guess").text;
		checkSubmission(submission);
	});

	$("#newGame").on("click", function(){
		newGame();
	});
});