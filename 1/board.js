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
        this.piece = new Piece(2);
        this.selected = {
            row: -1,
            col: -1
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
            });
        });

        if (this.isSelected()) {
            this.ctx.fillStyle = '#000000';
            this.ctx.strokeRect(this.selected.col * COL_SIZE, this.selected.row * ROW_SIZE, COL_SIZE, ROW_SIZE);
        }

    }

    // 블록 드롭
    drop() {
        // 모든 블록을 1칸 내리고 게임 오버 판정
        if (!this.down()) {
            // 게임 오버
            return false;
        }

        // 조건 만족 시 블록 없애기
        this.clear();

        return true;
    }

    // 선택
    select(col) {
        // 이미 어떤 블록을 선택했거나 선택한 줄이 비어 있을 경우
        if (this.grid[0][col] == 0) {
            return false;
        }
        this.selected.col = col;
        this.selected.row = ROWS - 1;
        // row
        while (this.selected.row >= 0 && this.grid[this.selected.row][this.selected.col] == 0) {
            this.selected.row--;
        }

        return true;
    }

    unselect() {
        this.selected.col = -1;
    }

    // 블록이 선택되었는지
    isSelected() {
        return this.selected.col >= 0;
    }

    // 블록 이동
    move(col) {
        if (this.selected.col == col) {
            this.unselect();
            return false;
        }
        let torow = ROWS - 1;
        while (torow >= 0 && this.grid[torow][col] == 0) {
            torow--;
        }
        this.grid[torow + 1][col] = this.grid[this.selected.row][this.selected.col];
        this.grid[this.selected.row][this.selected.col] = 0;
        this.unselect();
        this.clear();
        return true;
    }

    // 같은 줄 3개 이상일 때 클리어
    clear() {
        for (var i = 0; i < ROWS - 2; i++) {
            for (var j = 0; j < COLS; j++) {
                let g = this.grid[i][j];
                let n = 0;
                // 3줄이 맞을 경우
                if (g > 0 && this.grid[i + 1][j] == g && this.grid[i + 2][j] == g) {
                    this.grid[i][j] = 0;
                    this.grid[i + 1][j] = 0;
                    this.grid[i + 2][j] = 0;

                    for (var k = i; k < ROWS - 3; k++) {
                        this.grid[k][j] = this.grid[k + 3][j];
                        this.grid[k + 3][j] = 0;
                    }

                    // 클리어에 의해서 선택된 블록이 이동된 경우
                    if (j == this.selected.col) {
                        if (i + 2 == this.selected.row || this.grid[0][j] == 0) {
                            this.unselect();
                        } else {
                            this.selected.row -= 3;
                        }
                    }

                    account.score += 3;
                    account.exp ++;
              
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

                }
            }
        }
    }
    
    // 모든 블록 1칸 내리기
    down() {
        // 맨 아랫줄에 하나라도 채워져 있으면 게임 오버       
        for (var i = 0; i < COLS; i++) {
            if (this.grid[ROWS - 1][i] > 0) {
                return false;
            }
        }

        // 중간 줄
        for (var i = ROWS - 1; i > 0; i--) {
            for (var j = 0; j < COLS; j++) {
                this.grid[i][j] = this.grid[i - 1][j];
            }
        }

        this.selected.row++;

        // 첫 줄에 새 블록 채우기
        this.next = new Piece(2 + account.level);
        for (var i = 0; i < COLS; i++) {
            this.grid[0][i] = this.next.block[i];
        } 

        account.score += 1;

        this.clear();

        return true;
    }

}