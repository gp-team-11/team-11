class Piece {
    constructor(group) {
        this.nums = ROWS * COLS;
        this.array = new Array(this.nums);
        for (var i = 0; i < this.nums; i++) {
            this.array[i] = (group * this.nums) + i + 1;
        }
        this.shuffle();
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=votes#tab-top
    shuffle() {
        var currentIndex = this.nums;
        while (0 !== currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            var tmpValue = this.array[currentIndex];
            this.array[currentIndex] = this.array[randomIndex];
            this.array[randomIndex] = tmpValue;
        }
    }
}