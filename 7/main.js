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
    } else if (event.keyCode == KEY.LEFT) {
        btn_select(1);
    } else if (event.keyCode == KEY.DOWN) {
        btn_select(2);
    } else if (event.keyCode == KEY.RIGHT) {
        btn_select(3);
    }
}

function btn_select(num) {
    if (!requestId) {
        return;
    }
    if (!board.check(num)) {
        gameOver();
        return;
    }

    // 점수 증가
    account.score += Math.ceil(account.timelimit);
    account.exp += 1;

    if (account.exp >= 10) {
        if (account.level < MAX_LEVEL) {
            account.level++;
        }
        account.exp = 0;
    }

    board.setTimeLimit(LEVEL[account.level]);
    board.setNewPiece();
}

function btn_pause() {
    pause();
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
        account.timelimit = 0;
        gameOver();
        return;
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

    board.black();
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


