var canvas = document.getElementById("gallows");
var context = canvas.getContext("2d");
var score = 0;
var words;
var currentWord = "";
var blanks = "";

function newGame(){
	// Randomly generate correct answer from array

	// Create a group of dashes equal to the ammount of letter in correct answer
}

function drawStage(){
	context.moveTo(200, 150);
	context.lineTo(200, 100);

	context.lineTo(400, 100);
	context.lineTo(400, 300);

	context.moveTo(100, 300);
	context.lineTo(500, 300);
	context.stroke();
}

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

drawStage();
drawHead();
drawBody();
drawLeftArm();
drawRightArm();
drawLeftLeg();
drawRightLeg();

function resetGame(){
	let numOfWords = words.length;
	let random = Math.random() * numOfWords;
	currentWord = words[random];
	blanks = "";
	for(var i = 0; i < currentWord.length; i++){
		blanks += "_";
	}
	$("#newGame").prop("disabled", true);
	$("#guess").val("");
}

// Call when win condition is fulfilled
function winGame(){

}

// Call when you lost
function gameOver(){

}

// Check submission
function checkSubmission(submitted){

	function scoreUp(){
		let message = $("#message");

		score++;
		drawLimb();

		// Make sure you don't have a game over
		if(score < 6)
			message.html("Wrong answer!");
		else{
			message.html("Game Over");
			gameOver();
		}
	}

	// Check if the player guessed the entire word
	if(submitted.length > 1){
		if(currentWord === submitted){

		} else {
			scoreUp();
		}
	} else {
		// Check the word for the letter submitted
		if(currentWord.indexOf("submitted") > -1){

		} else {
			scoreUp();
		}
	}
}

// Decide which limb to draw based on score
function drawLimb(){

}

$(document).ready(function(){
	$.getJSON("json/words.json", function(data){
		words = [];
		words = data;
	});

	$("#submit").on("click", function(){

	});

	$("#newGame").on("click", function(){
		resetGame();
	});
});