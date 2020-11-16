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
        this.clickedInTime = false;
        this.currentNum = 1;
        this.inTimeNum = 1;
        this.currentGroup = 0;
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(0);
        this.next = null;

        var currentIndex = 0;
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLS; j++) {
                this.grid[i][j] = this.piece.array[currentIndex];
                currentIndex++;
            }
        }
    }

    // 해당 칸 클릭 시 이벤트
    click(row, col) {
        var value = this.grid[row][col];

        // check
        if ((value == this.currentNum)) {
            account.score += 1;
            this.currentNum++;
            account.exp++;
            if (account.exp >= 24) {
                if (account.level < MAX_LEVEL) {
                    account.level++;
                }
                account.exp = 0;
            }

            // if first click in group
            if (value % 12 == 1) {
                this.currentGroup++;
                this.next = new Piece(this.currentGroup);
            }       
            this.grid[row][col] = this.next.array[COLS * row + col];
            return true;
        }

        // game over
        return false;
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
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                    this.ctx.fillStyle = '#000000';
                    this.ctx.strokeRect(x * COL_SIZE, y * ROW_SIZE, COL_SIZE, ROW_SIZE);
                    this.ctx.font = "30px Arial";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(value, x * COL_SIZE + COL_SIZE / 2, y * ROW_SIZE + ROW_SIZE / 2);
                }
            });
        });


    }

    // 블록 드롭
    inTime() {
        this.inTimeNum++;
        //console.log(this.inTimeNum + " " + this.currentNum);
        //console.log(isNaN(this.inTimeNum) + " " + isNaN(this.currentNum));
        // 시간안에 특정 숫자까지 도달하지 못했을 경우
        //alert((this.inTineNum > this.currentNum));
        //alert(this.inTineNum - this.currentNum);
        if (this.inTimeNum > this.currentNum) {
            return false;
        }

        return true;
    }

}