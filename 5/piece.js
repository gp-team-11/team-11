class Piece {
    constructor(colors) {
        this.value = this.randomizeColor(Math.min(colors, COLORS.length - 1));
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}