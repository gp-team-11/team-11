const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasExp = document.getElementById('canvasExp');
const ctxExp = canvasExp.getContext('2d');
const canvasTime = document.getElementById('canvasTime');
const ctxTime = canvasTime.getContext('2d');

let board = new Board(ctx);
let gaugeBar = new GaugeBar(ctxExp, ctxTime);
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
    canvas.removeEventListener('click', handleMouseClick);
    canvas.addEventListener('click', handleMouseClick);
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

function handleMouseClick(event) {
    if (!requestId) {
        return;
    }
    let r = canvas.getBoundingClientRect();

    let row = Math.floor((event.y - r.top) * (BOARD_ROWS / r.height));
    let col = Math.floor((event.x - r.left) * (BOARD_COLS / r.width));

    board.fasten();
    let v = board.mouseMove(row, col);
    if (v > 0) {
        handleScore(v, v);
        gaugeBar.setExp(account.exp, EXP[account.level]);
        board.setTimeLimit(TIMELIMIT[account.level]);
    }
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
    } else if (event.keyCode === KEY.SPACE) {
        board.fasten();
    } else if (event.keyCode === KEY.R) {
        btn_reset();
    } else if (MOVES[event.keyCode]) {
        event.preventDefault();
        let p = MOVES[event.keyCode](board.getSelected());
        let v = board.keyboardMove(p.row, p.col);
        if (v > 0) {
            handleScore(v, v);
            gaugeBar.setExp(account.exp, EXP[account.level]);
            board.setTimeLimit(Math.min(account.timelimit * 1000 + TIMELIMIT[account.level], MAX_TIME));
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

function btn_pause() {
    pause();
}

function btn_reset() {
    if (!requestId) {
        return;
    }
    if (board.check()) {
        board.refill();
    }
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
    let time = board.getTimeLimit() - Math.floor(performance.now() - pausedTime);
    account.timelimit = (time / 1000).toFixed(2);
    gaugeBar.setTime(time, MAX_TIME);
    if (account.timelimit <= 0) {
        account.timelimit = 0;
        gameOver();
        return;
    }
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    gaugeBar.drawExpBar();
    gaugeBar.drawTimeBar();
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
    board.black();
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


