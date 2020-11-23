'use strict';

const COLS = 5;
const ROWS = 13;
const ROW_SIZE = 60;
const COL_SIZE = 120;
const MAX_LEVEL = 4;
const BORDER = 2;

const COLORS = [
    'none',
    '#DF6464', // 빨
    '#567795', // 파
    '#C9BC46' // 노
];

const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,    
    P: 80
};

const SHAPES = [
    [],
    [[17], [17]],
    [[17], [18], [2]],
    [[17], [19], [3], [3]],
    [[18], [2], [17]],
    [[18], [2], [18], [2]],
    [[18], [2], [19], [3], [3]],
    [[19], [3], [3], [17]],
    [[19], [3], [3], [18], [2]],
    [[19], [3], [3], [19], [3], [3]]
];

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 })
  };

const LEVEL = {
    0: 1000,
    1: 800,
    2: 600,
    3: 400,
    4: 200
};

[COLORS, KEY, SHAPES, LEVEL].forEach(item => Object.freeze(item));