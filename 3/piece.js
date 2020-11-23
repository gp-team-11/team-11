class Piece {
    constructor(colors) {
        this.block = new Array(COLS);
        this.color = new Array(COLS);
        for (var i = 0; i < COLS; i++) {
            this.block[i] = this.randomizeColor(Math.min(colors, COLORS.length - 1));
            this.color[i] = COLORS[this.block[i]];
        }
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}