class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = BOARD_COLS * BOARD_COL_SIZE;
        this.ctx.canvas.height = BOARD_ROWS * BOARD_ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = DROPCYCLE[0];
        this.grid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.piece = new Piece(COLORCOUNTS[0]);
        this.selected = {
            row: -1,
            col: -1
        }
    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit;
    }

    select(col) {
        if (this.grid[0][col] === 0) {
            return false;
        }
        this.selected.col = col;
        this.selected.row = BOARD_ROWS - 1;
        while (this.selected.row >= 0 && this.grid[this.selected.row][this.selected.col] === 0) {
            this.selected.row--;
        }

        return true;
    }

    unselect() {
        this.selected.col = -1;
    }

    isSelected() {
        return this.selected.col >= 0;
    }

    down() {
        for (let i = 0; i < BOARD_COLS; i++) {
            if (this.grid[BOARD_ROWS - 1][i] > 0) {
                return -1;
            }
        }

        for (let i = BOARD_ROWS - 1; i > 0; i--) {
            for (var j = 0; j < BOARD_COLS; j++) {
                this.grid[i][j] = this.grid[i - 1][j];
            }
        }

        this.selected.row++;

        this.next = new Piece(COLORCOUNTS[account.level]);
        for (let i = 0; i < BOARD_COLS; i++) {
            this.grid[0][i] = this.next.block[i];
        } 

        return this.clear();
    }

    move(col) {
        if (this.selected.col === col) {
            this.unselect();
            return 0;
        }
        let torow = BOARD_ROWS - 1;
        while (torow >= 0 && this.grid[torow][col] === 0) {
            torow--;
        }
        this.grid[torow + 1][col] = this.grid[this.selected.row][this.selected.col];
        this.grid[this.selected.row][this.selected.col] = 0;
        this.unselect();
        return this.clear();
    }

    clear() {
        let n = 0;
        for (let i = 0; i < BOARD_ROWS - 2; i++) {
            for (let j = 0; j < BOARD_COLS; j++) {
                let g = this.grid[i][j];

                if (g > 0 && this.grid[i + 1][j] === g && this.grid[i + 2][j] === g) {
                    this.grid[i][j] = 0;
                    this.grid[i + 1][j] = 0;
                    this.grid[i + 2][j] = 0;

                    for (let k = i; k < BOARD_ROWS - 3; k++) {
                        this.grid[k][j] = this.grid[k + 3][j];
                        this.grid[k + 3][j] = 0;
                    }

                    if (j === this.selected.col) {
                        if (i + 2 === this.selected.row || this.grid[0][j] === 0) {
                            this.unselect();
                        } else {
                            this.selected.row -= 3;
                        }
                    }

                    n += 3;
                }
            }
        }
        return n;
    }

    draw() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                    this.ctx.fill();
                } else {
                    this.ctx.fillStyle = BOARD_CELL_BG;
                    this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                    this.ctx.fill();
                }
            });
        });

        if (this.isSelected()) {
            this.ctx.lineWidth = BOARD_CELL_SELECTED_LINEWIDTH;
            this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
            this.roundedRect(this.ctx, (this.selected.col + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (this.selected.row + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
        }

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