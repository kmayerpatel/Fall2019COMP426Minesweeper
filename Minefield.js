const Minefield = class {
    constructor(width, height, bomb_count) {
	this.width = width;
	this.height = height;
	this.bomb_count = bomb_count;

	let bomb_flags = [];
	for (let b=0; b<width*height; b++) {
	    bomb_flags.push((b<bomb_count) ? true : false);
	}
	bomb_flags = shuffle(bomb_flags);
	    
	this.spots = new Array(width);
	for (let x=0; x<width; x++) {
	    this.spots[x] = new Array(height);
	    for (let y=0; y<height; y++) {
		this.spots[x][y] = new Spot(this, x, y, bomb_flags[x*height+y]);
	    }
	}
    }

    toString() {
	let field_string = "";
	for (let y=0; y<this.height; y++) {
	    for (let x=0; x<this.width; x++) {
		field_string += this.spots[x][y].toString();
		field_string += (x != this.width-1) ? " " : "\n";
	    }
	}
	return field_string;
    }
}

const Spot = class {
    constructor(minefield, x, y, is_bomb) {
	this.minefield = minefield;
	this.x = x;
	this.y = y;
	this.is_bomb = is_bomb;

	this.state = Spot.State.UNMARKED;
    }

    toString() {
	if (this.is_bomb) {
	    return "X";
	} else {
	    return " ";
	}
    }
}

Spot.State = {
    UNMARKED: 0,
    MARKED: 1,
    REVEALED: 2
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
let shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
