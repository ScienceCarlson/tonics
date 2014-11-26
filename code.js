var ISO_ODDS = 1/5;
var SATURATION_PT = 100;
var requiredStreak = 10;
var showRequiredStreak = true;
var insideConcentration = 0;
var outsideConcentration = 0;
var numberCorrect = 0;
var numberIncorrect = 0;
var streak = 0;
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "gray"];

function shouldBeIsotonic() {
	return (Math.random() <= ISO_ODDS);
}

function updateEnvironment() {
	document.getElementById("inside-solute-percent").innerHTML = insideConcentration.toString();
	document.getElementById("inside-water-percent").innerHTML = (100 - insideConcentration).toString();
	document.getElementById("outside-solute-percent").innerHTML = outsideConcentration.toString();
	document.getElementById("outside-water-percent").innerHTML = (100 - outsideConcentration).toString();
	document.getElementById("water-front").setAttribute("style", "opacity: " + ((outsideConcentration)/100).toString());
	document.getElementById("cell-front").setAttribute("style", "opacity: " + ((insideConcentration)/100).toString());
}

function newEnvironment() {
	insideConcentration = Math.floor(Math.random() * (SATURATION_PT + 1));
	if (shouldBeIsotonic()) {
		outsideConcentration = insideConcentration;
	}
	else {
		outsideConcentration = Math.floor(Math.random() * (SATURATION_PT + 1));
	}
	updateEnvironment();
	updateScores();
}

function getSolution() {
	if (insideConcentration < outsideConcentration) {
		return "hypertonic";
	}
	else if (insideConcentration > outsideConcentration) {
		return "hypotonic";
	}
	else {
		return "isotonic";
	}
}

function updateScores() {
	document.getElementById("streak").innerHTML = streak.toString();
	document.getElementById("correct").innerHTML = numberCorrect.toString();
	document.getElementById("incorrect").innerHTML = numberIncorrect.toString();
	document.getElementById("required-streak").innerHTML = requiredStreak.toString();
}

function changeRequiredStreak(newRequirement) {
	requiredStreak = newRequirement;
	updateScores();
}

function notify(correct) {
	if (correct) {
		document.getElementById("solution").setAttribute("class", "correct");
	}
	else {
		document.getElementById("solution").setAttribute("class", "incorrect");
	}
}

function showSolution(solution) {
	document.getElementById("solution").innerHTML = solution.toUpperCase();
}

function changeColor(num) {
	document.getElementById("cell-front").setAttribute("class", "cell " + colors[num]);
	document.getElementById("water-front").setAttribute("class", "water " + colors[num]);
}

function selectType(guess) {
	var solution = getSolution();
	if (guess == getSolution()) {
		numberCorrect++;
		streak++;
		notify(true);
	}
	else {
		numberIncorrect++;
		streak = 0;
		notify(false)
	}
	showSolution(solution);
	newEnvironment();
}

window.onload = function () {
	newEnvironment();
}
