class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = BOARD_COLS * BOARD_COL_SIZE;
        this.ctx.canvas.height = BOARD_ROWS * BOARD_ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = MAX_TIME;
        this.grid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.tmpgrid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.piece = null;
        this.selected = {
            row: 0,
            col: 0
        }
        this.fastened = false;
        this.refill();
    }

    refill() {
        for (let row in this.grid) {
            for (let col in this.grid[row]) {
                this.piece = new Piece(COLORCOUNTS[account.level]);
                this.grid[row][col] = this.piece.value;
            }
        }

        while (this.clear() > 0) { }
    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit * 1000;
    }

    fasten() {
        this.fastened = true;
    }

    select(row, col) {
        this.selected.row = row;
        this.selected.col = col;
    }

    getSelected() {
        return this.selected;
    }

    keyboardMove(row, col) {
        return this.click(row, col);
    }

    mouseMove(row, col) {
        this.fasten();
        return this.click(row, col);
    }

    click(row, col) {
        if (row === this.selected.row && col === this.selected.col) {
            this.fastened = !this.fastened;
            return 0;
        } else if ((row === this.selected.row && (col === this.selected.col - 1 || col === this.selected.col + 1)) || (col === this.selected.col && (row === this.selected.row - 1 || row === this.selected.row + 1))) {
            if (this.fastened) {
                let tmp = this.grid[row][col];
                this.grid[row][col] = this.grid[this.selected.row][this.selected.col];
                this.grid[this.selected.row][this.selected.col] = tmp;

                let n = this.clear();
                if (n > 0) {
                    let v = 1;
                    while(v > 0) {
                        v = this.clear();
                        n = n + v;
                    }
                    this.fastened = false;
                    return n;
                } else {
                    this.grid[this.selected.row][this.selected.col] = this.grid[row][col];
                    this.grid[row][col] = tmp;
                }
            }
        }
        this.fastened = false;
        this.select(row, col);
        return 0;
    }

    clear() {
        let n = 0;
        this.tmpgrid = JSON.parse(JSON.stringify(this.grid));
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLS; j++) {
                let value = this.grid[i][j];
                if (i < BOARD_ROWS - 2 && this.grid[i + 1][j] === value && this.grid[i + 2][j] === value) {
                    this.tmpgrid[i][j] = 0;
                    this.tmpgrid[i + 1][j] = 0;
                    this.tmpgrid[i + 2][j] = 0;
                }
                if (j < BOARD_COLS < 2 && this.grid[i][j + 1] === value && this.grid[i][j + 2] === value) {
                    this.tmpgrid[i][j] = 0;
                    this.tmpgrid[i][j + 1] = 0;
                    this.tmpgrid[i][j + 2] = 0;
                }
            }
        }
        this.grid = JSON.parse(JSON.stringify(this.tmpgrid));
        for (let i = 0; i < BOARD_COLS; i++) {
            for (let j = BOARD_ROWS - 1; j > 0; j--) {
                if (this.grid[j][i] === 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (this.grid[k][i] > 0) {
                            this.grid[j][i] = this.grid[k][i];
                            this.grid[k][i] = 0;
                            break;
                        }
                    }
                }
            }

            for (let j = 0; j < BOARD_ROWS; j++) {
                if (this.grid[j][i] > 0) {
                    break;
                }
                this.piece = new Piece(COLORCOUNTS[account.level]);
                this.grid[j][i] = this.piece.value;
                n++;
            }
        }
        return n;
    }

    check() {
        function equals(v1, v2, v3) {
            return (v1 === v2 && v2 === v3);
        }

        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLS; j++) {
                if (j < BOARD_COLS - 1) {
                    let v1 = this.grid[i][j];
                    let v2 = this.grid[i][j + 1];
                    if (i >= 2 && equals(v1, this.grid[i - 1][j + 1], this.grid[i - 2][j + 1]) ||
                        j <= BOARD_COLS - 4 && equals(v1, this.grid[i][j + 2], this.grid[i][j + 3]) ||
                        i <= BOARD_ROWS - 3 && equals(v1, this.grid[i + 1][j + 1], this.grid[i + 2][j + 1]) ||
                        i >= 2 && equals(v2, this.grid[i - 1][j], this.grid[i - 2][j]) ||
                        j >= 2 && equals(v2, this.grid[i][j - 1], this.grid[i][j - 2]) ||
                        i <= BOARD_ROWS - 3 && equals(v2, this.grid[i + 1][j], this.grid[i + 2][j])) {
                            return false;
                    }
                }

                if (i < BOARD_ROWS - 1) {
                    let v1 = this.grid[i][j];
                    let v2 = this.grid[i + 1][j];
                    if (j >= 2 && equals(v1, this.grid[i + 1][j - 1], this.grid[i + 1][j - 2]) ||
                        i <= BOARD_ROWS - 4 && equals(v1, this.grid[i + 2][j], this.grid[i + 3][j]) ||
                        j <= BOARD_COLS - 3 && equals(v1, this.grid[i + 1][j + 1], this.grid[i + 1][j + 2]) ||
                        j >= 2 && equals(v2, this.grid[i][j - 1], this.grid[i][j - 2]) ||
                        i >= 2 && equals(v2, this.grid[i - 1][j], this.grid[i - 2][j]) ||
                        j <= BOARD_COLS - 3 && equals(v2, this.grid[i][j + 1], this.grid[i][j + 2])) {
                            return false;
                    }
                }
            }
        }
        return true;
    }

    draw() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.fillStyle = COLORS[value];
                this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                this.ctx.fill();
            });
        });
        if (this.fastened) {
            this.ctx.strokeStyle = BOARD_CELL_FASTENED_COLOR;
        } else {
            this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
        }
        this.ctx.lineWidth = BOARD_CELL_SELECTED_LINEWIDTH;
        this.roundedRect(this.ctx, (this.selected.col + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (this.selected.row + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
    }

    black() {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.fillStyle = BOARD_CELL_BG;
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                this.ctx.fill();       
            });
        });
        this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
        this.ctx.lineWidth = BOARD_CELL_SELECTED_LINEWIDTH;
        this.roundedRect(this.ctx, (this.selected.col + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (this.selected.row + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
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