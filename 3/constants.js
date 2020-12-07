'use strict';

const MAX_LEVEL = 4;

const BOARD_COLS = 6;
const BOARD_ROWS = 13;
const BOARD_COL_SIZE = 180;
const BOARD_ROW_SIZE = 110;
const BOARD_CELL_PADDING = 0.05;
const BOARD_CELL_RADIUS = 10;
const BOARD_CELL_BG = '#000000';
const BOARD_CELL_SELECTED_COLOR = '#ffffff';
const BOARD_CELL_SELECTED_LINEWIDTH = 7;
const BOARD_BOTTOM_LINE = '#ffffff';
const BOARD_BOTTOM_LINE_WIDTH = 3;

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
    '#ffff00',
    '#00e700',
    '#f763ff',
    '#ffa500'
];

const KEY = {
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    Z: 90,
    X: 88,
    P: 80
};

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, col: Math.max(p.col - 1, 0) }),
    [KEY.RIGHT]: (p) => ({ ...p, col: Math.min(p.col + 1, BOARD_COLS - 1) }),
    [KEY.UP]: (p) => ({ ...p, row: Math.max(p.row - 1, 0) }),
    [KEY.DOWN]: (p) => ({ ...p, row: Math.min(p.row + 1, BOARD_ROWS - 2) })
};

const COLORCOUNTS = {
    0: 2,
    1: 3,
    2: 4,
    3: 5,
    4: 6
}

const DROPCYCLE = {
    0: 5000,
    1: 4000,
    2: 3200,
    3: 2560,
    4: 2048
};

const EXP = {
    0: 30,
    1: 50,
    2: 70,
    3: 100,
    4: 0
};

[COLORS, KEY, MOVES, COLORCOUNTS, DROPCYCLE, EXP].forEach(item => Object.freeze(item));