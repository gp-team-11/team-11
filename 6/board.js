class Board {
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = COLS * COL_SIZE;
        this.ctx.canvas.height = ROWS * ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    reset() {
        this.timelimit = SHOWTIME;
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(BLOCKCOUNTS[0], COLORCOUNTS[0]);
        this.state = false;
        this.selected = {
            row: 0,
            col: 0
        }
        this.show();
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
        for (var i = 0, c = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++, c++) {
                this.grid[i][j] = this.piece.array[c];
            }
        }
    }

    setNewPiece() {
        this.piece = new Piece(BLOCKCOUNTS[account.level], COLORCOUNTS[account.level]); // 레벨에 맞는 조각
    }

    // 제한 시간
    getTimeLimit() {
        return this.timelimit;
    }

    setTimeLimit(time) {
        this.timelimit += time - account.timelimit * 1000;
    }

    // 제출한 게 맞나 확인
    check() {
        for (var i = 0, c = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++, c++) {
                if (this.grid[i][j] != this.piece.array[c]) {
                    return false;
                }
            }
        }      
        return true;
    }

    // 버튼 누름
    paint(num) {
        if (this.state) {
            this.grid[this.selected.row][this.selected.col] = num;
        }
    }

    // 빈 보드 반환
    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    // 보드를 화면에 출력
    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                }
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
            });
        });
        this.ctx.fillStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.selected.col * COL_SIZE, this.selected.row * ROW_SIZE, COL_SIZE, ROW_SIZE);
    }

    // 보드에서 칸 선택
    select(row, col) {
        this.selected.row = row;
        this.selected.col = col;
    }
}