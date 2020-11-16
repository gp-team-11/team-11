const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let board = new Board(ctx);
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

// 이벤트 리스터 설정
function addEventListener() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

// 버튼 눌렀을 때 이벤트
function btn_select(col) {
    if (board.isSelected()) {
        board.move(col);
    } else {
        board.select(col);
    }
}

function btn_down() {
    board.down();
}

function btn_pause() {
    pause();
}

// 키보드 이벤트
function handleKeyPress(event) {
    if (event.keyCode === KEY.P) {
        pause();
    }
    if (event.keyCode === KEY.ESC) {
        // gameOver();
    }
    if (event.keyCode == KEY.LEFT) {
        btn_select(0);
    }
    if (event.keyCode == KEY.DOWN) {
        btn_select(1);
    }
    if (event.keyCode == KEY.RIGHT) {
        btn_select(2);
    }
    if (event.keyCode == KEY.SPACE) {
        board.down();
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
    //
    // 화면에 추가

}

// 게임 오버
function gameOver() {
    cancelAnimationFrame(requestId);
    alert("Game Over");

    // 스코어 저장 등 이벤트 추가
}

// 스크립트 로드 시 바로 실행
this.play();


