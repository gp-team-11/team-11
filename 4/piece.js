class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.typeId = Math.floor(Math.random() * 9 + 1);
        this.shape = SHAPES[this.typeId];
        this.x = 0;
        this.y = 0;
        this.length = SHAPES[this.typeId].length;
        this.hardDropped = false;
    }

    draw() {
        var color = '#000000';
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value % 16];
                    this.ctx.fillRect((this.x + x) * COL_SIZE, (this.y + y) * ROW_SIZE, COL_SIZE, ROW_SIZE);
                    // 기준선 그리기
                    if (value >> 4 > 0) {
                        this.ctx.fillStyle = '#CCCCCC';
                        this.ctx.fillRect((this.x + x) * COL_SIZE, (this.y + y) * ROW_SIZE, COL_SIZE, ROW_SIZE * 0.2);
                    }
                }
            });
        });
    }

    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }

    hardDrop() {
        this.hardDropped = true;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}