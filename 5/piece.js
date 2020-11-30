class Piece {
    constructor(colors) {
        this.typeId = this.randomizeColor(Math.min(colors, COLORS.length - 1));
        this.color = COLORS[this.typeId];
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}