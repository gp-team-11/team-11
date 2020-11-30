class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = COLS * COL_SIZE;
        this.ctx.canvas.height = ROWS * ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = LEVEL[0];
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(NUMS[0], RANGES[0]);
        for (var i = 0, c = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++, c++) {
                this.grid[i][j] = this.piece.array[c];
            }
        }
    }

    setNewPiece() {
        this.piece = new Piece(NUMS[account.level], RANGES[account.level]); // 레벨에 맞는 조각
        for (var i = 0, c = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++, c++) {
                this.grid[i][j] = this.piece.array[c];
            }
        }
    }

    // 제한 시간
    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit * 1000;
    }

    // 제출한 게 맞나 확인
    check(num) {
        var sum = 0;
        this.piece.array.forEach((i) => {
            if (!isNaN(i)) {
                sum += i;
            }
        });
        if (sum < 7) {
            return (num == 1);
        } else if (sum == 7) {
            return (num == 2);
        } else {
            return (num == 3);
        }
    }

    // 빈 보드 반환
    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    }

    // 보드를 화면에 출력
    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != null) {
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                    this.ctx.fillStyle = '#000000';
                    this.ctx.font = "100px Arial";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(value, x * COL_SIZE + COL_SIZE / 2, y * ROW_SIZE + ROW_SIZE / 2);
                }
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
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

    black() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != null) {
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                }
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
            });
        });
    }

}