const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let board = new Board(ctx);
let requestId = null;
let time = null;
let pausedTime = 0;

let accountValues = {
    timelimit: 0,
    score: 0,
    exp: 0,
    level: 0
};

function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

// 이벤트 리스너 설정
function addEventListener() {
    canvas.removeEventListener('click', handleMouseClick);
    canvas.addEventListener('click', handleMouseClick);
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

function handleMouseClick(event) {
    // 일시정지일 경우
    if (!requestId) {
        return;
    }
    var r = canvas.getBoundingClientRect();

    var row = Math.floor((event.y - r.top - BORDER) * (ROWS / (r.height - BORDER * 2)));
    var col = Math.floor((event.x - r.left - BORDER) * (COLS / (r.width - BORDER * 2)));

    board.select(row, col);
}

function handleKeyPress(event) {
    if (event.keyCode === KEY.P) {
        pause();
    }
    if (!requestId) {
        return;
    }
    if (event.keyCode === KEY.ESC) {
        // gameOver();
    } else if (event.keyCode === KEY.Q) {
        btn_paint(1);
    } else if (event.keyCode === KEY.W) {
        btn_paint(2);
    } else if (event.keyCode === KEY.E) {
        btn_paint(3);
    } else if (event.keyCode === KEY.A) {
        btn_paint(4);
    } else if (event.keyCode === KEY.S) {
        btn_paint(5);
    } else if (event.keyCode === KEY.D) {
        btn_paint(6);
    } else if (event.keyCode === KEY.SPACE) {
        btn_submit();
    } else if (event.keyCode === KEY.R) {
        btn_paint(0);
    }
}

function btn_pause() {
    pause();
}

function btn_submit() {
    if (!requestId) {
        return;
    }
    if (board.getState()) {
        if (!board.check()) {
            // 틀렸을 경우
            gameOver();
            return;
        } else {
            // 맞았으면 다음으로
            board.setTimeLimit(SHOWTIME);
            account.score += Math.ceil(account.timelimit);
            account.exp += 1;

            if (account.exp >= 2) {
                if (account.level < MAX_LEVEL) {
                    account.level++;
                }
                account.exp = 0;
            }

            board.setNewPiece();
            board.show();
        }
    }
}

function btn_paint(num) {
    if (!requestId) {
        return;
    }
    board.paint(num);
}

// 게임 리셋
function resetGame() {
    account.timelimit = 0;
    account.score = 0;
    account.exp = 0;
    account.level = 0;
    board.reset();
}

// 게임 시작
function play() {
    addEventListener();

    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    resetGame();
    animate();
}

function animate(now = 0) {
    // 제한 시간
    account.timelimit = ((board.getTimeLimit() - Math.floor(performance.now() - pausedTime)) / 1000).toFixed(2);
    if (account.timelimit <= 0) {
        if (board.getState()) {
            account.timelimit = 0;
            gameOver();
            return;
        } else {
            board.setTimeLimit(HIDETIME);
            board.hide();            
        }
    }
  
    // 보드 상태 초기화
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (!requestId) {
        pausedTime = performance.now() + pausedTime;
        animate();
        document.getElementById("btn_pause").innerHTML = "Pause";
        return;
    }

    pausedTime = pausedTime - performance.now();
    cancelAnimationFrame(requestId);
    requestId = null;

    document.getElementById("btn_pause").innerHTML = "Continue";
}

function gameOver() {
    cancelAnimationFrame(requestId);
    requestId = null;
    alert("Game Over");

    // 스코어 저장 등 이벤트 추가
}

// 스크립트 로드 시 바로 실행
this.play();


