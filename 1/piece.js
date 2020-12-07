class Piece {
    constructor(colors) {
        this.block = new Array(BOARD_COLS);
        this.color = new Array(BOARD_COLS);
        for (let i = 0; i < BOARD_COLS; i++) {
            this.block[i] = this.randomizeColor(Math.min(colors, COLORS.length - 1));
            this.color[i] = COLORS[this.block[i]];
        }
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}