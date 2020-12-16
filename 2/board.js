class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = BOARD_COLS * BOARD_COL_SIZE;
        this.ctx.canvas.height = BOARD_ROWS * BOARD_ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = TIMELIMIT[0];
        this.currentNum = 1;
        this.inTimeNum = 1;
        this.currentGroup = 0;
        this.grid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));;
        this.piece = new Piece(0);
        this.next = null;
        this.selected = {
            row: 0,
            col: 0
        }

        for (let i = 0, c = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLS; j++, c++) {
                this.grid[i][j] = this.piece.array[c];
            }
        }

    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit * 1000;
    }

    select(p) {
        this.selected.row = p.row;
        this.selected.col = p.col;
    }

    getSelected() {
        return this.selected;
    }

    click(p) {
        let value = this.grid[p.row][p.col];

        if ((value === this.currentNum)) {
            this.currentNum++;

            if (value % (BOARD_ROWS * BOARD_COLS) === 1) {
                this.currentGroup++;
                this.next = new Piece(this.currentGroup);
            }       
            this.grid[p.row][p.col] = this.next.array[BOARD_COLS * p.row + p.col];
            return true;
        }

        return false;
    }

    draw() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = BOARD_CELL_COLOR;
                    this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                    this.ctx.fill();
                    this.ctx.fillStyle = BOARD_TEXT_COLOR;
                    this.ctx.font = BOARD_FONT_SIZE + 'px ' + BOARD_FONT_FAMILY;
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(value, x * BOARD_COL_SIZE + BOARD_COL_SIZE / 2, y * BOARD_ROW_SIZE + BOARD_ROW_SIZE / 2 + BOARD_FONT_SIZE / 3);
                }
            });
        });
        this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
        this.ctx.lineWidth = BOARD_CELL_SELECTED_LINEWIDTH;
        this.roundedRect(this.ctx, (this.selected.col + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (this.selected.row + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
    }

    black() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.fillStyle = BOARD_CELL_COLOR;
                this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                this.ctx.fill();
            });
        });
    }

    roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
    }
}