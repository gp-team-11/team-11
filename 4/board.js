class Board {
    // 생성자
    constructor (ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.ctx.canvas.width = COLS * COL_SIZE;
        this.ctx.canvas.height = ROWS * ROW_SIZE;
        this.ctxNext.canvas.width = 3 * COL_SIZE;
        this.ctxNext.canvas.height = 6 * ROW_SIZE;
        this.ctx.scale(1, 1);
        this.ctxNext.scale(1, 1);
    }

    // 보드 초기화
    reset() {
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.ctx);
        this.piece.setPosition(2, - this.piece.length);
        this.getNewPiece();
    }

    // 새 블록
    getNewPiece() {
        const {width, height} = this.ctxNext.canvas;
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, width, height);
        this.next.setPosition(1, 3 - this.next.length / 2);
        this.next.draw();
    }

    // 빈 보드 반환
    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    // 보드를 화면에 출력
    draw() {
        this.piece.draw();
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value % 16];
                    this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                    // 기준선 그리기
                    if (value >> 4 > 0) {
                        this.ctx.fillStyle = '#CCCCCC';
                        this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE * 0.2);
                    }                    
                }
            });
        });
    
    }

    drop() {
        let p = MOVES[KEY.DOWN](this.piece);
        if (this.validMove(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            while(this.clear()) {

            }
            if (this.piece.y < 0) {
                // Game over
                return false;
            }
            this.piece = this.next;
            this.piece.setPosition(2, - this.piece.length);
            this.piece.ctx = this.ctx;
            this.getNewPiece();
        }
        return true;
    }

    // 이동이 유효한지
    validMove(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
            });
        });        
    }

    isInsideWalls(x, y) {
        return x >= 0 && x < COLS && y <= ROWS;
    }
    
    notOccupied(x, y) {
        return y < 0 || (this.grid[y] && this.grid[y][x] === 0);
    }    

    // 1줄 클리어
    clear() {
        let b = false;
        let length = 0;

        this.grid.forEach((row, y) => {
        // If every value is greater than zero then we have a full row.
            row.forEach((value, x) => {
                var i = x;
                length = 0;

                // 이어져있는 선의 개수 세기
                while (i < COLS) {
                    if (value > 0 && this.grid[y][i] >> 4 > 0) {
                        length++;
                        i++;
                    } else {
                        break;
                    }
                }

                // 만족하면 블록을 없앰
                if (length >= 3) {
                    b = true;
                    for (i = x; i < x + length; i++) {
                        this.grid[y][i] = 0;
                        account.score++;
                        var j = y + 1;
                        while (j < ROWS && this.grid[j][i] >> 4 == 0) {
                            this.grid[j][i] = 0;
                            account.score++;
                            j++;
                        }
                        // 블록 아래로 내리기
                        while (!this.isCleared(i)) {

                        }
                    }
                    account.exp++;
                }
            });
        });

        // 일정 조건 만족하면 다음 레벨로 상승
        if (account.exp >= 10) {
            // 다음 레벨로 상승
            if (account.level < MAX_LEVEL) {
                account.level++;
            }
            account.exp = 0;
    
            // 블럭이 내려오는 속도 증가
            time.level = LEVEL[account.level];
        } 
        return b;
    }

    // 라인이 정리됐는지 여부 // 정리되지 않았으면 정리함
    isCleared(col) {
        for (var i = 0; i < ROWS - 1; i++) {
            if (this.grid[i][col] != 0 && this.grid[i + 1][col] == 0) {
                this.grid[i + 1][col] = this.grid[i][col];
                this.grid[i][col] = 0;
                return false;
            }
        }
        return true;
    }

    // piece를 보드에 고정
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0 && (y + this.piece.y) >= 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }
    
}