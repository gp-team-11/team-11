class Piece {
    constructor(numberOfBlocks, range) {
        this.nums = BOARD_ROWS * BOARD_COLS;
        this.array = new Array(this.nums);

        this.generate(numberOfBlocks, range);
        this.shuffle();
    }

    // 랜덤으로 뽑되 합이 7에서 크게 벗어나지 않도록 조절
    generate(numberOfBlocks, range) {
        let r = Math.floor(Math.random() * 3) + 6; // 6~8
        let s = 0;
        for (let i = 0; i < this.nums; i++) {
            if (i < numberOfBlocks) {
                this.array[i] = Math.random() * (range * 2) - range;
                s += this.array[i];
            } else {
                this.array[i] = null;
            }
        }

        for (let i = 0; i < numberOfBlocks; i++) {
            this.array[i] = Math.round(this.array[i] + (r - s) / numberOfBlocks);
        }
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