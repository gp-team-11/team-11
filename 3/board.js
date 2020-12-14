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
        this.tmpgrid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.piece = new Piece(COLORCOUNTS[0]);
        this.selected = {
            row: 0,
            col: 0
        }
    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit;
    }

    select(p) {
        this.selected.row = p.row;
        this.selected.col = p.col;
    }

    getSelected() {
        return this.selected;
    }

    click(p) {
        if (p.row === BOARD_ROWS - 1) {
            return false;
        }
        this.select(p);
        let n = this.deletableBlocks(p.row, p.col);
        if (n > 0) {
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
            }         
            return n;
        };
        return 0;
    }

    deletableBlocks(row, col) {
        this.tmpgrid = JSON.parse(JSON.stringify(this.grid));
        let color = this.grid[row][col];
        let num = this.toZero(row, col, color) + this.validBlocks(row, col, 0, color);
        if (num < 3) {
            return 0;
        }
        return num;
    }

    validBlocks(row, col, num, color) {
        if (color == 0) {
            return 0;
        }
        let s = num;

        if (this.toZero(row - 1, col, color) > 0)  {
            s = this.validBlocks(row - 1, col, s + 1, color); 
        }
        if (this.toZero(row + 1, col, color) > 0) {
            s = this.validBlocks(row + 1, col, s + 1, color); 
        }
        if (this.toZero(row, col - 1, color) > 0) {
            s = this.validBlocks(row, col - 1, s + 1, color); 
        }
        if (this.toZero(row, col + 1, color) > 0) {
            s = this.validBlocks(row, col + 1, s + 1, color); 
        }      
        return s;
    }

    toZero(row, col, color) {
        if (row < 0 || row >= BOARD_ROWS - 1 || col < 0 || col >= BOARD_COLS) {
            return 0;
        }
        if (this.tmpgrid[row][col] === color) {
            this.tmpgrid[row][col] = 0;
            return 1;
        } 
        return 0;
    }

    up() {
        for (let i = 0; i < BOARD_COLS; i++) {
            if (this.grid[0][i] > 0) {
                return false;
            }
        }
        for (let i = 0; i < BOARD_ROWS - 1; i++) {
            for (let j = 0; j < BOARD_COLS; j++) {
                this.grid[i][j] = this.grid[i + 1][j];
            }
        }
        this.next = new Piece(2 + account.level);
        for (let i = 0; i < BOARD_COLS; i++) {
            this.grid[BOARD_ROWS - 1][i] = this.next.value[i];
        } 
        return true;
    }

    draw() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                } else {
                    this.ctx.fillStyle = BOARD_CELL_BG;
                }
                this.roundedRect(this.ctx, (x + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (y + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);
                this.ctx.fill();
            });
        });
        this.ctx.lineWidth = BOARD_CELL_SELECTED_LINEWIDTH;
        this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
        this.roundedRect(this.ctx, (this.selected.col + BOARD_CELL_PADDING) * BOARD_COL_SIZE, (this.selected.row + BOARD_CELL_PADDING) * BOARD_ROW_SIZE, BOARD_COL_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_ROW_SIZE * (1 - 2 * BOARD_CELL_PADDING), BOARD_CELL_RADIUS);

        this.ctx.lineWidth = BOARD_BOTTOM_LINE_WIDTH;
        this.ctx.strokeStyle = BOARD_BOTTOM_LINE;
        this.line(ctx, 0, (BOARD_ROWS - 1) * BOARD_ROW_SIZE, BOARD_COLS * BOARD_COL_SIZE, (BOARD_ROWS - 1) * BOARD_ROW_SIZE);
    }

    line (ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
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