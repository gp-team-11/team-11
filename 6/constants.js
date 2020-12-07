'use strict';

const MAX_LEVEL = 9;

const BOARD_COLS = 3;
const BOARD_ROWS = 4;
const BOARD_COL_SIZE = 360;
const BOARD_ROW_SIZE = 360;
const BOARD_CELL_PADDING = 0.05;
const BOARD_CELL_RADIUS = 10;
const BOARD_CELL_BG = '#000000';
const BOARD_CELL_SELECTED_COLOR = '#ffffff';
const BOARD_CELL_SELECTED_LINEWIDTH = 10;

const GAUGEBAR_WIDTH = 360;
const GAUGEBAR_HEIGHT = 36;
const GAUGEBAR_PADDING = 5;
const GAUGEBAR_OUTER_RADIUS = 18;
const GAUGEBAR_INNER_RADIUS = 10;
const GAUGEBAR_EXP_BG = '#000000';
const GAUGEBAR_EXP_COLOR = '#4ac6ff';
const GAUGEBAR_TIME_BG = '#000000';
const GAUGEBAR_TIME_COLOR = '#df6464';

const COLORS = [
    'none',
    '#ff4a42',
    '#00c6ff',
    '#ffff00',
    '#00e700',
    '#f763ff',
    '#ffa500'
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
    [KEY.LEFT]: (p) => ({ ...p, col: Math.max(p.col - 1, 0) }),
    [KEY.RIGHT]: (p) => ({ ...p, col: Math.min(p.col + 1, BOARD_COLS - 1) }),
    [KEY.UP]: (p) => ({ ...p, row: Math.max(p.row - 1, 0) }),
    [KEY.DOWN]: (p) => ({ ...p, row: Math.min(p.row + 1, BOARD_ROWS - 1) })
};

const PAINTS = {
    [KEY.Q] : () => 1,
    [KEY.W] : () => 2,
    [KEY.E] : () => 3,
    [KEY.A] : () => 4,
    [KEY.S] : () => 5,
    [KEY.D] : () => 6,
    [KEY.R] : () => 0
}

const COLORCOUNTS = {
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

const BLOCKCOUNTS = {
    0: 2,
    1: 3,
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 8,
    7: 9,
    8: 10,
    9: 11
};

const SHOWTIME = {
    0: 5000,
    1: 5000,
    2: 5000,
    3: 5000,
    4: 5000,
    5: 5000,
    6: 5000,
    7: 5000,
    8: 5000,
    9: 5000
}

const HIDETIME = {
    0: 10000,
    1: 10000,
    2: 10000,
    3: 10000,
    4: 10000,
    5: 10000,
    6: 10000,
    7: 10000,
    8: 10000,
    9: 10000
}

const EXP = {
    0: 2,
    1: 3,
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 8,
    7: 9,
    8: 10,
    9: 0
};

[COLORS, KEY, MOVES, PAINTS, COLORCOUNTS, BLOCKCOUNTS, SHOWTIME, HIDETIME, EXP].forEach(item => Object.freeze(item));