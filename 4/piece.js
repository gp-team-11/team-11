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
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (this.isBottom(value)) {
                    this.ctx.fillStyle = COLORS[value & 3];
                    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
                    this.drawBottom(y, x);
                }
                if (this.isMiddle(value)) {
                    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
                    this.ctx.fillStyle = COLORS[value & 3];
                    this.drawMiddle(y, x);
                }
                if (this.isTop(value)) {
                    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
                    this.ctx.fillStyle = BOARD_BLOCK_TOP_COLOR;
                    this.drawTop(y, x);
                }

            });
        });
    }

    drawTop(row, col) {
        let x = (this.x + col) * BOARD_COL_SIZE;
        let y = (this.y + row) * BOARD_ROW_SIZE;
        this.ctx.fillRect(x, y, BOARD_COL_SIZE, BOARD_ROW_SIZE * BOARD_BLOCK_TOP);
    }

    drawMiddle(row, col) {
        let x = (this.x + col) * BOARD_COL_SIZE;
        let y = (this.y + row) * BOARD_ROW_SIZE;
        this.ctx.fillRect(x + BOARD_COL_SIZE * BOARD_BLOCK_PADDING, y, BOARD_COL_SIZE * (1 - 2 * BOARD_BLOCK_PADDING), BOARD_ROW_SIZE);
    }

    drawBottom(row, col) {
        let x = (this.x + col) * BOARD_COL_SIZE;
        let y = (this.y + row) * BOARD_ROW_SIZE;
        let p = BOARD_COL_SIZE * BOARD_BLOCK_PADDING;
        this.ctx.beginPath();
        this.ctx.moveTo(x + p, y);
        this.ctx.lineTo(x + p, y + BOARD_ROW_SIZE - BOARD_BLOCK_RADIUS);
        this.ctx.arcTo(x + p, y + BOARD_ROW_SIZE, x + p + BOARD_BLOCK_RADIUS, y + BOARD_ROW_SIZE, BOARD_BLOCK_RADIUS);
        this.ctx.lineTo(x + BOARD_COL_SIZE - p - BOARD_BLOCK_RADIUS, y + BOARD_ROW_SIZE);
        this.ctx.arcTo(x + BOARD_COL_SIZE - p, y + BOARD_ROW_SIZE, x + BOARD_COL_SIZE - p, y + BOARD_ROW_SIZE - BOARD_BLOCK_RADIUS, BOARD_BLOCK_RADIUS);
        this.ctx.lineTo(x + BOARD_COL_SIZE - p, y);
        this.ctx.lineTo(x + p, y);
        this.ctx.stroke();
        this.ctx.fill();
    }

    isTop(id) {
        return ((id & 16) > 0);
    }

    isMiddle(id) {
        return ((id & 8) > 0);
    }

    isBottom(id) {
        return ((id & 4) > 0);
    }

    blockId(id) {
        return (id & 3);
    }

    hardDrop() {
        this.hardDropped = true;
    }

    move(p) {
        if (!this.hardDropped) {
            this.x = p.x;
            this.y = p.y;
        }
        this.shape = p.shape;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    randomizeColor(numberOfColors) {
        return Math.floor(Math.random() * numberOfColors + 1);
    }
}