const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
const canvasExp = document.getElementById('canvasExp');
const ctxExp = canvasExp.getContext('2d');

let board = new Board(ctx, ctxNext);
let gaugeBar = new GaugeBar(ctxExp);
let requestId = null;
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
        if (key === 'level' && value === MAX_LEVEL) {
            element.textContent = 'MAX';
        } else {
            element.textContent = value;
        }
    }
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
      target[key] = value;
      updateAccount(key, value);
      return true;
    }
});

function addEventListener() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
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
    } else if (MOVES[event.keyCode]) {
        event.preventDefault();
        let p = MOVES[event.keyCode](board.piece);
        if (event.keyCode === KEY.SPACE) {
            btn_down();
        } else if (board.validMove(p)) {
            board.piece.move(p);
        }
    }
}

function handleScore(score, exp) {
    account.score += score;
    account.exp += exp;

    if (account.exp >= EXP[account.level]) {
        if (account.level < MAX_LEVEL) {
            account.level++;
        }
        account.exp = 0;
    }
}

function btn_move(num) {
    if (!requestId) {
        return;
    }

    let p = MOVES[BUTTONS[num]](board.piece);
    if (board.validMove(p)) {
        board.piece.move(p);
    }
}

function btn_pause() {
    pause();
}

function btn_down() {
    if (!requestId) {
        return;
    }
    let p = MOVES[KEY.DOWN](board.piece);
    let n = 0;
    while (board.validMove(p)) {
        n += board.drop();
        p = MOVES[KEY.DOWN](board.piece);
    }
    board.piece.hardDrop();
    board.setTimeLimit(100);
    handleScore(n, n);
    gaugeBar.setExp(account.exp, EXP[account.level]);
}

function reset() {
    account.timelimit = 0;
    account.score = 0;
    account.exp = 0;
    account.level = 0;
    board.reset();
}

function play() {
    addEventListener();
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    reset();
    animate();
}

function animate() {
    account.timelimit = board.getTimeLimit() - performance.now() + pausedTime;
    if (account.timelimit <= 0) {
        let n = board.drop();
        if (n < 0) {
            gameOver();
            return;
        } else {
            board.setTimeLimit(DROPCYCLE[account.level]);
            handleScore(n, n);
            gaugeBar.setExp(account.exp, EXP[account.level]);
        }
    }
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    gaugeBar.drawExpBar();
    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (!requestId) {
        animate();
        document.getElementById("btn_pause").innerHTML = "Pause";
        return;
    }

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


