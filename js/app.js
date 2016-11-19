var canvas = document.getElementById("gallows");
var context = canvas.getContext("2d");
var score = 0;
var words = [];
var currentWord = "";
var correctGuesses = [];
var numOfBlanks = 100;
var blanks = [];
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

// Trying my hand at a callback function
function getData(callback){
	var data = $.getJSON("json/words.json", function(data){
		callback(data);
	});
}

function newGame(){
	let numOfWords = words.length;
	let random = Math.floor(Math.random() * numOfWords);
	currentWord = words[random];
		
	for(var i = 0; i < currentWord.length; i++){
		blanks.push("_");
	}
	message.text(blanks);
	
	score = 0;
	context.clearRect(0,0, canvas.width, canvas.height);
	context.beginPath();

	drawStage();
	$("#newGame").prop("disabled", true);
	$("#guess").val("");
}

// Call when win condition is fulfilled
function winGame(){
	message.html("You won! Congratulations!");
	$("#newGame").prop("disabled", false);
}

// Call when you lost
function gameOver(){
	message.html("Game Over");
	$("#newGame").prop("disabled", false);
}

// Check submission
function checkSubmission(submitted){
	numOfBlanks = 0;
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
		if(currentWord.includes(submitted)){
			// Change instances of letter in blanks variable
			correctGuesses.push(submitted);
			let newBlank = [];
			for(var i = 0; i < currentWord.length; i++){
				// Check if current index of currentWord is in correct answers
				if(correctGuesses.indexOf(currentWord[i]) > -1){
					newBlank.push(currentWord[i]);
				}
				else{
					newBlank.push("_");
					numOfBlanks++;
				}
				blanks = newBlank.toString();
			}
			message.text(blanks);
			if(numOfBlanks === 0)
				winGame();
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
	data = $.parseJSON($.ajax({
		url: "json/words.json",
		dataType: "json",
		async: false
	}).responseText);
	words = data;

	newGame();
	$("#submit").on("click", function(){
		let submission = $("#guess").val();
		checkSubmission(submission);
	});

	$("#newGame").on("click", function(){
		newGame();
	});
	
});
