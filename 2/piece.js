class Piece {
    constructor(group) {
        this.nums = BOARD_ROWS * BOARD_COLS;
        this.array = new Array(this.nums);
        for (let i = 0; i < this.nums; i++) {
            this.array[i] = (group * this.nums) + i + 1;
        }
        this.shuffle();
    }

    shuffle() {
        let currentIndex = this.nums;
        while (0 !== currentIndex) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            let tmpValue = this.array[currentIndex];
            this.array[currentIndex] = this.array[randomIndex];
            this.array[randomIndex] = tmpValue;
        }
    }
}