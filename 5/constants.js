'use strict';

const MAX_LEVEL = 4;
const MAX_TIME = 20000;

const BOARD_COLS = 6;
const BOARD_ROWS = 8;
const BOARD_COL_SIZE = 180;
const BOARD_ROW_SIZE = 180;
const BOARD_CELL_PADDING = 0.05;
const BOARD_CELL_RADIUS = 10;
const BOARD_CELL_BG = '#000000';
const BOARD_CELL_FASTENED_COLOR = '#ff0000';
const BOARD_CELL_SELECTED_COLOR = '#ffffff';
const BOARD_CELL_SELECTED_LINEWIDTH = 7;

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
    R: 82
};

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, col: Math.max(p.col - 1, 0) }),
    [KEY.RIGHT]: (p) => ({ ...p, col: Math.min(p.col + 1, BOARD_COLS - 1) }),
    [KEY.UP]: (p) => ({ ...p, row: Math.max(p.row - 1, 0) }),
    [KEY.DOWN]: (p) => ({ ...p, row: Math.min(p.row + 1, BOARD_ROWS - 1) })
};

const COLORCOUNTS = {
    0: 2,
    1: 3,
    2: 4,
    3: 5,
    4: 6
}

const TIMELIMIT = {
    0: 5000,
    1: 2500,
    2: 1500,
    3: 1000,
    4: 500
};

const EXP = {
    0: 200,
    1: 200,
    2: 200,
    3: 200,
    4: 0
};

[COLORS, KEY, MOVES, COLORCOUNTS, TIMELIMIT, EXP].forEach(item => Object.freeze(item));