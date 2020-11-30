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
        this.timelimit = 10000;
        this.grid = this.getEmptyGrid();
        this.tmpgrid = this.getEmptyGrid();
        this.selected = {
            row: -1,
            col: -1
        }        
        this.resetBoard();
    }

    // 판만 초기화
    resetBoard() {
        // 가득 채우기
        for (var row in this.grid) {
            for (var col in this.grid[row]) {
                this.piece = new Piece(2);
                this.grid[row][col] = this.piece.typeId;
            }
        }

        // clear
        // 리셋으로 인한 클리어 시 점수 증가 억제하도록 클리어에 파라미터 추가
        while (this.clear(false)) {

        }
    }

    // 누적 제한 시간 반환
    limit() {
        return this.timelimit;
    }

    // 해당 칸 클릭 시 이벤트
    click(row, col) {
        var value = this.grid[row][col];
        var rd = row - this.selected.row;
        var cd = col - this.selected.col;
        if (this.isSelected()) {
            // 체크
            // 똑같은 곳 클릭하면 해제
            if (rd == 0 && cd == 0) {
                this.unselect();
            } else if ((rd == 0 && (cd == -1 || cd == 1)) || (cd == 0 && (rd == -1 || rd == 1))) {
                var tmp = this.grid[row][col];
                this.grid[row][col] = this.grid[this.selected.row][this.selected.col];
                this.grid[this.selected.row][this.selected.col] = tmp;

                // 클리어 되면 바로 클리어
                if (this.clear(true)) {
                    while (this.clear(true)) {

                    }
                    this.unselect();
                } else {
                    // 클리어되지 않으면 다시 원위치
                    this.grid[this.selected.row][this.selected.col] = this.grid[row][col];
                    this.grid[row][col] = tmp;
                    // 그리고 그냥 선택
                    this.select(row, col);
                }
            } else {
                this.select(row, col);
            }
            // 바로 옆 클릭하면 옮기고 해제
        } else {
            this.select(row, col);
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
                this.ctx.fillStyle = COLORS[value];
                this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
            });
        });
        if (this.isSelected()) {
            this.ctx.fillStyle = '#000000';
            this.ctx.strokeRect(this.selected.col * COL_SIZE, this.selected.row * ROW_SIZE, COL_SIZE, ROW_SIZE);
        }
    }

    // 일시정지 시 화면 가리기
    black() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                this.ctx.fillStyle = '#000000';
                this.ctx.strokeRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
            });
        });
    }

    // 선택
    select(row, col) {
        this.selected.row = row;
        this.selected.col = col;
    }

    // 선택 해제
    unselect() {
        this.selected.row = -1;
        this.selected.col = -1;
    }

    // 블록이 선택되었는지
    isSelected() {
        return this.selected.row >= 0 && this.selected.col >= 0;
    }
    
    // 조건에 맞는 블럭 지우기
    clear(isNormal) {
        var b = false;
        this.tmpgrid = JSON.parse(JSON.stringify(this.grid));
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (this.validRow(y, x)) {
                    b = true;
                    this.tmpgrid[y][x] = 0;
                    this.tmpgrid[y][x + 1] = 0;
                    this.tmpgrid[y][x + 2] = 0;
                }
                if (this.validCol(y, x)) {
                    b = true;
                    this.tmpgrid[y][x] = 0;
                    this.tmpgrid[y + 1][x] = 0;
                    this.tmpgrid[y + 2][x] = 0;
                }                
            });
        });

        this.grid = JSON.parse(JSON.stringify(this.tmpgrid));

        // 채워 넣기
        for (var i = 0; i < COLS; i++) {
            while (!this.isCleared(i)) {

            }

            var j = 0;
            while (j < ROWS && this.grid[j][i] == 0) {
                this.piece = new Piece(2 + account.level); // + level
                this.grid[j][i] = this.piece.typeId;
                j++;

                // 리셋이 아닌 일반 경우
                if (isNormal) {
                    // 새로 채워진 블록의 개수는 없어진 블록의 개수와 같음
                    account.score++;
                    account.exp++;
                    // 부순 블록 수만큼 제한시간 증가
                    this.timelimit += LEVEL[account.level];

                    if (account.exp >= 30) {
                        // 다음 레벨로 상승
                        if (account.level < MAX_LEVEL) {
                            account.level++;
                        }
                        account.exp = 0;
            
                    }
                }      
            }
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

    // 없앨 수 있는 row인지 (grid 내 row, col)
    validRow(row, col) {
        if (col >= COLS - 2) {
            return false;
        }
        var value = this.grid[row][col];
        if (this.grid[row][col + 1] == value && this.grid[row][col + 2] == value) {
            return true;
        } else {
            return false;
        }
    }

    // 없앨 수 있는 col인지 (grid 내 row, col)
    validCol(row, col) {
        if (row >= ROWS - 2) {
            return false;
        }
        var value = this.grid[row][col];
        if (this.grid[row + 1][col] == value && this.grid[row + 2][col] == value) {
            return true;
        } else {
            return false;
        }
    }    
}