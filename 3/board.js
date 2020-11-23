class Board {
    // 생성자
    constructor (ctx) {
        this.ctx = ctx;
        this.ctx.canvas.width = COLS * COL_SIZE;
        this.ctx.canvas.height = ROWS * ROW_SIZE;
        this.ctx.scale(1, 1);
    }

    // 보드 초기화
    reset() {
        this.grid = this.getEmptyGrid();
        this.tmpgrid = this.grid.slice();
        this.piece = new Piece(2);
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
            });
        });
        
        // 대기줄
        this.ctx.moveTo(0, (ROWS - 1) * ROW_SIZE);
        this.ctx.lineTo(COLS * COL_SIZE, (ROWS - 1) * ROW_SIZE);
        this.ctx.stroke();
    }

    // 클릭
    click(row, col) {
        // 맨 아랫줄
        if (row == ROWS - 1) {
            return false;
        }
        var n = this.deletableBlocks(row, col);
        if (n > 0) {
            // 임시 배열을 사용
            this.grid = JSON.parse(JSON.stringify(this.tmpgrid));

            // 블록 아래로 내리기
            this.clear();

            // 점수 증가
            account.score += n;
            account.exp += 1;

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
            return true;
        };
        return false;
    }

    // 빈 칸 아래로 내리기
    clear() {
        for (var i = 0; i < COLS; i++) {
            while(!this.isCleared(i)) {

            }
        }
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

    // 해당 블록이 3개 이상 이어져 있는지
    deletableBlocks(row, col) {
        this.tmpgrid = JSON.parse(JSON.stringify(this.grid));
        var color = this.grid[row][col];
        var num = this.toZero(row, col, color) + this.validBlocks(row, col, 0, color);
        if (num < 3) {
            return 0;
        }
        return num;
    }

    // 특정 칸에서 이어져 있는 블록 개수
    validBlocks(row, col, num, color) {
        if (color == 0) {
            return 0;
        }
        var s = num;

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

    // 임시 배열에서 0으로 바꿀 수 있으면 1을 반환
    toZero(row, col, color) {
        if (row < 0 || row >= ROWS - 1 || col < 0 || col >= COLS) {
            return 0;
        }
        if (this.tmpgrid[row][col] == color) {
            this.tmpgrid[row][col] = 0;
            return 1;
        } 
        return 0;
    }

    // 블록 드롭 (위로 올리기)
    drop() {
        // 모든 블록을 1칸 내리고 게임 오버 판정
        if (!this.up()) {
            // 게임 오버
            return false;
        }

        return true;
    }
    
    // 모든 블록 1칸 올리기
    up() {
        // 맨 윗줄에 하나라도 채워져 있으면 게임 오버       
        for (var i = 0; i < COLS; i++) {
            if (this.grid[0][i] > 0) {
                return false;
            }
        }

        // 중간 줄
        for (var i = 0; i < ROWS - 1; i++) {
            for (var j = 0; j < COLS; j++) {
                this.grid[i][j] = this.grid[i + 1][j];
            }
        }

        // 맨 아랫줄에 새 블록 채우기
        this.next = new Piece(2 + account.level);
        for (var i = 0; i < COLS; i++) {
            this.grid[ROWS - 1][i] = this.next.block[i];
        } 

        return true;
    }
}