const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasExp = document.getElementById('canvasExp');
const ctxExp = canvasExp.getContext('2d');

let board = new Board(ctx);
let gaugeBar = new GaugeBar(ctxExp);
let requestId = null;
let isGameover = false;
let startTime = 0;
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
    } else if (event.keyCode === KEY.LEFT) {
        btn_select(0);
    } else if (event.keyCode === KEY.DOWN) {
        btn_select(1);
    } else if (event.keyCode === KEY.RIGHT) {
        btn_select(2);
    } else if (event.keyCode == KEY.SPACE) {
        btn_down();
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

function btn_select(col) {
    if (!requestId) {
        return;
    }
    if (board.isSelected()) {
        let v = board.move(col);
        if (v > 0) {
            handleScore(v, v);
            gaugeBar.setExp(account.exp, EXP[account.level]);
        }
    } else {
        board.select(col);
    }
}

function btn_down() {
    if (!requestId) {
        return;
    }    
    let v = board.down();
    if (v > 0) {
        handleScore(v, v);
        gaugeBar.setExp(account.exp, EXP[account.level]);
    }
}

function btn_pause() {
    pause();
}

function reset() {
    startTime = performance.now();
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
    account.timelimit = board.getTimeLimit() - performance.now() + pausedTime + startTime;
    if (account.timelimit <= 0) {
        board.setTimeLimit(DROPCYCLE[account.level]);
        let v = board.down();
        if (v < 0) {
            gameOver();
            return;
        } else {
            handleScore(v, v);
            gaugeBar.setExp(account.exp, EXP[account.level]);           
        }
    }
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    gaugeBar.drawExpBar();
    requestId = requestAnimationFrame(animate);
}

function pause() {
    if (isGameover) {
        return;
    }
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

    form.appendChild(setAttribute("game", "1"));
    form.appendChild(setAttribute("name", document.getElementById("name").value));
    form.appendChild(setAttribute("score", account.score));

    document.body.appendChild(form);
    form.submit();
}