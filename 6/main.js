const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasExp = document.getElementById('canvasExp');
const ctxExp = canvasExp.getContext('2d');
const canvasTime = document.getElementById('canvasTime');
const ctxTime = canvasTime.getContext('2d');

let board = new Board(ctx);
let gaugeBar = new GaugeBar(ctxExp, ctxTime);
let requestId = null;
let isGameover = false;
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
    } else if (event.keyCode === KEY.SPACE) {
        btn_submit();
    } else if (PAINTS[event.keyCode]) {
        btn_paint(PAINTS[event.keyCode]());
    } else if (MOVES[event.keyCode]) {
        event.preventDefault();
        board.move(MOVES[event.keyCode](board.getSelected()));
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

function btn_submit() {
    if (!requestId) {
        return;
    }
    if (board.getState()) {
        if (!board.check()) {
            gameOver();
            return;
        } else {
            handleScore(Math.ceil(account.timelimit), 1);
            gaugeBar.setExp(account.exp, EXP[account.level]);
            board.setTimeLimit(SHOWTIME[account.level]);
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
    if (board.getState()) {
        gaugeBar.setTime(time, HIDETIME[account.level]);
    } else {
        gaugeBar.setTime(time, SHOWTIME[account.level]);
    }
    if (account.timelimit <= 0) {
        if (board.getState()) {
            account.timelimit = 0;
            gameOver();
            return;
        } else {
            board.setTimeLimit(HIDETIME[account.level]);
            board.hide();            
        }
    }
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    gaugeBar.drawExpBar();
    gaugeBar.drawTimeBar();
    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (isGameover) {
        return;
    }
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
    isGameover = true;

    $('#final-score').text(account.score);
    $('#final-score-hidden').val(account.score);
    $('.popup_end').fadeIn();
}

function submit() {
    function setAttribute(name, value) {
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", name);
        hiddenField.setAttribute("value", value);
        return hiddenField;
    }

    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../upload.php");

    form.appendChild(setAttribute("game", "6"));
    form.appendChild(setAttribute("name", document.getElementById("name").value));
    form.appendChild(setAttribute("score", account.score));

    document.body.appendChild(form);
    form.submit();
}