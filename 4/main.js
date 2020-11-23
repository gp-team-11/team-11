const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

let board = new Board(ctx, ctxNext);
let requestId = null;
let time = null;

let accountValues = {
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

// 버튼 눌렀을 때 이벤트 << 바꿔야 함
function btn_move(key) {
    if (!requestId) {
        return;
    }

    let e = null;
    switch(key) {
        case 0:
            e = KEY.LEFT;
            break;
        case 1:
            e = KEY.DOWN;
            break;
        case 2:
            e = KEY.RIGHT;
            break;
    }
    let p = MOVES[e](board.piece);
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
    while (board.validMove(p)) {
        //account.score += POINTS.HARD_DROP;
        board.piece.move(p);
        p = MOVES[KEY.DOWN](board.piece);
    }
    board.piece.hardDrop();
}

// 키보드 이벤트
function handleKeyPress(event) {
    if (event.keyCode === KEY.P) {
        pause();
    }
    if (!requestId) {
        return;
    }
    if (event.keyCode === KEY.ESC) {
        // gameOver();
    }
    if (MOVES[event.keyCode]) {
        event.preventDefault();
        // Get new state
        let p = MOVES[event.keyCode](board.piece);
        if (event.keyCode === KEY.SPACE) {
            btn_down();
        } else if (board.validMove(p)) {
            board.piece.move(p);
        }
    }

}

// 게임 리셋
function resetGame() {
    account.score = 0;
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
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        if (!board.drop()) {
            gameOver();
            return;
        }
    }
  
    // 보드 상태 초기화
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    board.draw();
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

// 게임 오버
function gameOver() {
    cancelAnimationFrame(requestId);
    requestId = null;
    alert("Game Over");

    // 스코어 저장 등 이벤트 추가
}

// 스크립트 로드 시 바로 실행
this.play();


