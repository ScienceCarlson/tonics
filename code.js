var ISO_ODDS = 1 / 5;
var SATURATION_PT = 100;
var requiredStreak = 15;
var showRequiredStreak = true; //What is the point of this?
var insideConcentration = 0;
var outsideConcentration = 0;
var numberCorrect = 0;
var numberIncorrect = 0;
var streak = 0;
//var colors = ["red", "orange", "yellow", "green", "blue", "purple", "gray"];

window.onload = function () {
    newEnvironment();
};

function newEnvironment() {
    //Math.random() returns a random number
    //Math.floor() rounds the number down to the nearest digit
    //These two combined means to take a random number, multiply it by 101, and round it down to the nearest integer. This is what the inside concentration will be
    insideConcentration = Math.floor(Math.random() * (SATURATION_PT + 1));
    if (shouldBeIsotonic()) {
        //Only true 20% (1 in 5) times. Set the outside and inside concentraion to be the same
        outsideConcentration = insideConcentration;
    } else {
        //The other 80% of the time will randomly create an outside concentration gradient
        outsideConcentration = Math.floor(Math.random() * (SATURATION_PT + 1));
    }
    updateEnvironment();
    updateScores();
}

function shouldBeIsotonic() {
    //Only returns if a random number is less than or equal to 0.2 (1 in 5 chance)
    return (Math.random() <= ISO_ODDS);
}

function updateEnvironment() {
    //Sets up the percentages for water & solutes inside and outside the beakers and converts them to strings 
    document.getElementById("inside-solute-percent").innerHTML = insideConcentration.toString();
    document.getElementById("inside-water-percent").innerHTML = (100 - insideConcentration).toString();
    document.getElementById("outside-solute-percent").innerHTML = outsideConcentration.toString();
    document.getElementById("outside-water-percent").innerHTML = (100 - outsideConcentration).toString();
    //These lines below change the color of the water. I might undo the commenting out at some point in the future. 
    //	document.getElementById("water-front").setAttribute("style", "opacity: " + ((outsideConcentration)/100).toString());
    //	document.getElementById("cell-front").setAttribute("style", "opacity: " + ((insideConcentration)/100).toString());
}

function selectType(guess) {
    //Takes the button click from the html and calls the result the "guess"
    var solution = getSolution(); //Checks to see what the actual answer IS
    if (guess == getSolution()) {
        numberCorrect++;
        streak++;
        notify(true);
        streakCheck(); //My addition
    } else {
        numberIncorrect++;
        streak = 0;
        streakCheck(); //My addition
        notify(false)
    }
    showSolution(solution); //Sends the actual answer to be displayed
    newEnvironment();
}

function getSolution() { //The function of this is to determine what the environment actually IS
    if (insideConcentration < outsideConcentration) {
        return "hypertonic";
    } else if (insideConcentration > outsideConcentration) {
        return "hypotonic";
    } else {
        return "isotonic";
    }
}

function notify(correct) { //It will display the correct answer anyways. This determines if it is displayed green (correct) or red (incorrect)
    if (correct) {
        document.getElementById("solution").setAttribute("class", "correct");
    } else {
        document.getElementById("solution").setAttribute("class", "incorrect");
    }
}

//This shows the solution (in upper case). How it is shown depends on the class
function showSolution(solution) {
    document.getElementById("solution").innerHTML = solution.toUpperCase();
}


//My contribution
function streakCheck() {
    if (streak > (requiredStreak - 1)) {
        document.getElementById("page-background").setAttribute("class", "streakmet");
    } else {
        document.getElementById("page-background").removeAttribute("class");
    }
}

//Converts all numbers to string (not sure why, though it doesn't like it if I disable this)
function updateScores() {
    document.getElementById("streak").innerHTML = streak.toString();
    document.getElementById("correct").innerHTML = numberCorrect.toString();
    document.getElementById("incorrect").innerHTML = numberIncorrect.toString();
    document.getElementById("required-streak").innerHTML = requiredStreak.toString();
}

//I honestly don't know what this function does
function changeRequiredStreak(newRequirement) {
    requiredStreak = newRequirement;
    updateScores();
}

// Below is the function to change the colors of the cells, which I didn't need
/*
function changeColor(num) {
	document.getElementById("cell-front").setAttribute("class", "cell " + colors[num]);
	document.getElementById("water-front").setAttribute("class", "water " + colors[num]);
}
*/
