var characters = 0;
var money = 0;
var bananas = 0;
var monkeys = 0;
var character_worth = 0.25;
var banana_cost = 0.5;

function update_stats() {
	document.getElementById("characters").innerHTML = characters;
	document.getElementById("money").innerHTML = money;
	document.getElementById("bananas").innerHTML = bananas;
}

function type_character() {
	characters++;
	update_stats();
}

function publish() {
	var earned = Math.floor(characters * character_worth);
	if (earned < 1) {
		return;
	}
	characters -= Math.floor(earned) / character_worth;
	money += earned / 100;
	update_stats();
}

function buy_banana() {
	if (money < banana_cost) {
		return;
	}
	money -= banana_cost;
	bananas++;
	update_stats();
}

function feed_monkey() {
	if (banana < 1) {
		return;
	}
	bananas--;
	monkeys++;
}
