class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = BOARD_COLS * BOARD_COL_SIZE;
        this.ctx.canvas.height = BOARD_ROWS * BOARD_ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = SHOWTIME[0];
        this.grid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.piece = new Piece(BLOCKCOUNTS[0], COLORCOUNTS[0]);
        this.state = false;
        this.selected = {
            row: 0,
            col: 0
        }
        this.show();
    }

    setNewPiece() {
        this.piece = new Piece(BLOCKCOUNTS[account.level], COLORCOUNTS[account.level]);
    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit * 1000;
    }

    getState() {
        return this.state;
    }

    hide() {
        this.state = true;
        this.grid.forEach((row) => {
            row.fill(0);
        });
    }

    show() {
        this.state = false;
        for (let i = 0, c = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLS; j++, c++) {
                this.grid[i][j] = this.piece.array[c];
            }
        }
    }

    check() {
        for (let i = 0, c = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLS; j++, c++) {
                if (this.grid[i][j] != this.piece.array[c]) {
                    return false;
                }
            }
        }      
        return true;
    }

    paint(num) {
        if (this.state) {
            this.grid[this.selected.row][this.selected.col] = num;
        }
    }

    select(row, col) {
        this.selected.row = row;
        this.selected.col = col;
    }

    getSelected() {
        return this.selected;
    }

    move(p) {
        this.selected.row = p.row;
        this.selected.col = p.col;
    }

    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
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
        this.ctx.strokeStyle = BOARD_CELL_SELECTED_COLOR;
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