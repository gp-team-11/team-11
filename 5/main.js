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
}

function handleMouseClick(event) {
    // 일시정지일 경우
    if (!requestId) {
        return;
    }
    var r = canvas.getBoundingClientRect();

    var row = Math.floor((event.y - r.top - BORDER) * (ROWS / (r.height - BORDER * 2)));
    var col = Math.floor((event.x - r.left - BORDER) * (COLS / (r.width - BORDER * 2)));

    board.click(row, col);
}

function btn_pause() {
    pause();
}

function btn_reset() {
    if (!requestId) {
        return;
    }
    board.resetBoard();
}

// 게임 리셋
function resetGame() {
    account.timelimit = 0;
    account.score = 0;
    account.exp = 0;
    account.level = 0;
    board.reset();
    time = { start: performance.now(), elapsed: 0, level: LEVEL[account.level] };
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

// 표현
function animate(now = 0) {
    // 제한 시간
    account.timelimit = ((board.limit() - Math.floor(performance.now() - pausedTime)) / 1000).toFixed(2);
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

    pausedTime = pausedTime - performance.now();
    board.black();
    cancelAnimationFrame(requestId);
    requestId = null;

    document.getElementById("btn_pause").innerHTML = "Continue";
}

// 게임 오버
function gameOver() {
    cancelAnimationFrame(requestId);
    requestId = null;
    alert("Game Over");

    // 스코어 저장 등 이벤트 추가
}

// 스크립트 로드 시 바로 실행
this.play();


