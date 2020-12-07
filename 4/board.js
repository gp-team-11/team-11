class Board {
    constructor (ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.ctx.canvas.width = BOARD_COLS * BOARD_COL_SIZE;
        this.ctx.canvas.height = BOARD_ROWS * BOARD_ROW_SIZE;
        this.ctxNext.canvas.width = 3 * BOARD_COL_SIZE;
        this.ctxNext.canvas.height = 6 * BOARD_ROW_SIZE;
        this.ctx.scale(1, 1);
        this.ctxNext.scale(1, 1);
    }

    reset() {
        this.timelimit = DROPCYCLE[0];
        this.grid = Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(0));
        this.piece = new Piece(this.ctx);
        this.piece.setPosition(2, - this.piece.length);
        this.getNewPiece();
    }

    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit;
    }

    getNewPiece() {
        const {width, height} = this.ctxNext.canvas;
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, width, height);
        this.next.setPosition(1, 3 - this.next.length / 2);
        this.next.draw();
    }

    drop() {
        let n = 0;
        let p = MOVES[KEY.DOWN](this.piece);
        if (this.validMove(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            var c = this.clear();
            while(c > 0) {
                n += c;
                c = this.clear();
            }
            if (this.piece.y < 0) {
                return -1;
            }
            this.piece = this.next;
            this.piece.setPosition(2, - this.piece.length);
            this.piece.ctx = this.ctx;
            this.getNewPiece();
        }
        return n;
    }

    validMove(p) {
        function isInside(x, y) {
            return (x >= 0 && x < BOARD_COLS && y < BOARD_ROWS);
        }

        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 || isInside(x, y) && (y < 0 || this.grid[y][x] === 0);
            });
        });        
    }

    clear() {
        let n = 0;

        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                let i = x;
                let length = 0;

                while (i < BOARD_COLS) {
                    if (this.isTop(this.grid[y][i])) {
                        length++;
                        i++;
                        continue;
                    }
                    break;
                }

                if (length >= 3) {
                    for (i = x; i < x + length; i++) {
                        this.grid[y][i] = 0;
                        n++;
                        let j = y + 1;
                        while (j < BOARD_ROWS && !this.isTop(this.grid[j][i])) {
                            this.grid[j][i] = 0;
                            n++;
                            j++;
                        }

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
                }
            });
        });
        return n;
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0 && (y + this.piece.y) >= 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    draw() {
        this.piece.draw();
        this.grid.forEach((row, y) => {
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
        let x = col * BOARD_COL_SIZE;
        let y = row * BOARD_ROW_SIZE;
        this.ctx.fillRect(x, y, BOARD_COL_SIZE, BOARD_ROW_SIZE * BOARD_BLOCK_TOP);
    }

    drawMiddle(row, col) {
        let x = col * BOARD_COL_SIZE;
        let y = row * BOARD_ROW_SIZE;
        this.ctx.fillRect(x + BOARD_COL_SIZE * BOARD_BLOCK_PADDING, y, BOARD_COL_SIZE * (1 - 2 * BOARD_BLOCK_PADDING), BOARD_ROW_SIZE);
    }

    drawBottom(row, col) {
        let x = col * BOARD_COL_SIZE;
        let y = row * BOARD_ROW_SIZE;
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
}