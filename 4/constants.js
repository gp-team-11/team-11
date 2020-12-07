'use strict';

const MAX_LEVEL = 4;

const BOARD_COLS = 5;
const BOARD_ROWS = 13;
const BOARD_COL_SIZE = 120;
const BOARD_ROW_SIZE = 60;
const BOARD_BLOCK_PADDING = 0.1;
const BOARD_BLOCK_RADIUS = 10;
const BOARD_BLOCK_TOP = 0.2;
const BOARD_BLOCK_TOP_COLOR = '#ffffff';

const GAUGEBAR_WIDTH = 360;
const GAUGEBAR_HEIGHT = 36;
const GAUGEBAR_PADDING = 5;
const GAUGEBAR_OUTER_RADIUS = 18;
const GAUGEBAR_INNER_RADIUS = 10;
const GAUGEBAR_EXP_BG = '#000000';
const GAUGEBAR_EXP_COLOR = '#4ac6ff';

const COLORS = [
    'none',
    '#ff4a42',
    '#00c6ff',
    '#ffff00'
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
    [[21], [21]],
    [[21], [26], [6]],
    [[21], [27], [11], [7]],
    [[26], [6], [21]],
    [[26], [6], [26], [6]],
    [[26], [6], [27], [11], [7]],
    [[27], [11], [7], [21]],
    [[27], [11], [7], [26], [6]],
    [[27], [11], [7], [27], [11], [7]]
];

const BUTTONS = {
    0: KEY.LEFT,
    1: KEY.DOWN,
    2: KEY.RIGHT
}

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 })
  };

const DROPCYCLE = {
    0: 1000,
    1: 800,
    2: 600,
    3: 400,
    4: 200
};

const EXP = {
    0: 30,
    1: 50,
    2: 70,
    3: 100,
    4: 0
};

[COLORS, KEY, SHAPES, BUTTONS, MOVES, DROPCYCLE, EXP].forEach(item => Object.freeze(item));