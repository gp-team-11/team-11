'use strict';

const COLS = 3;
const ROWS = 4;
const ROW_SIZE = 380;
const COL_SIZE = 240;
const BORDER = 2;
const SHOWTIME = 5000;
const HIDETIME = 10000;

const MAX_LEVEL = 9;

const COLORS = [
    'none',
    '#DF6464', // 빨
    '#567795', // 파
    '#C9BC46', // 노
    '#3CB371', // 초
    '#6B4784', // 보
    '#A0D468', // 연
    '#AF7960' // 갈
];

const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80,
    Q: 81,
    W: 87,
    E: 69,
    A: 65,
    S: 83,
    D: 68,
    R: 82
};

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 })
};

const COLORCOUNTS = {
    0: 2,
    1: 3,
    2: 3,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 6,
    8: 6,
    9: 7
};

const BLOCKCOUNTS = {
    0: 2,
    1: 2,
    2: 3,
    3: 3,
    4: 4,
    5: 4,
    6: 5,
    7: 5,
    8: 6,
    9: 6
};

[COLORS, MOVES, KEY, COLORCOUNTS, BLOCKCOUNTS].forEach(item => Object.freeze(item));