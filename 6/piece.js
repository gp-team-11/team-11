class Piece {
    constructor(numberOfBlocks, numberOfColors) {
        this.nums = ROWS * COLS;
        this.array = new Array(this.nums);
        for (var i = 0; i < this.nums; i++) {
            if (i < numberOfBlocks) {
                this.array[i] = this.randomizeColor(Math.min(numberOfColors, COLORS.length - 1));
            } else {
                this.array[i] = 0;
            }
        }
        this.shuffle();
    }

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

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}