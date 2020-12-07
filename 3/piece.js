class Piece {
    constructor(colors) {
        this.value = new Array(BOARD_COLS);
        for (let i = 0; i < BOARD_COLS; i++) {
            this.value[i] = this.randomizeColor(Math.min(colors, COLORS.length - 1));
        }
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}