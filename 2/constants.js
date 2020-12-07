'use strict';

const MAX_LEVEL = 4;

const BOARD_COLS = 3;
const BOARD_ROWS = 4;
const BOARD_COL_SIZE = 360;
const BOARD_ROW_SIZE = 360;
const BOARD_CELL_PADDING = 0.05;
const BOARD_CELL_RADIUS = 10;
const BOARD_CELL_COLOR = '#ffffff';
const BOARD_CELL_SELECTED_COLOR = '#ff0000';
const BOARD_CELL_SELECTED_LINEWIDTH = 7;
const BOARD_FONT_SIZE = 100;
const BOARD_FONT_FAMILY = 'MapleBold';
const BOARD_TEXT_COLOR = '#000000';

const GAUGEBAR_WIDTH = 360;
const GAUGEBAR_HEIGHT = 36;
const GAUGEBAR_PADDING = 5;
const GAUGEBAR_OUTER_RADIUS = 18;
const GAUGEBAR_INNER_RADIUS = 10;
const GAUGEBAR_EXP_BG = '#000000';
const GAUGEBAR_EXP_COLOR = '#4ac6ff';
const GAUGEBAR_TIME_BG = '#000000';
const GAUGEBAR_TIME_COLOR = '#df6464';

const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80
};

const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, col: Math.max(p.col - 1, 0) }),
    [KEY.RIGHT]: (p) => ({ ...p, col: Math.min(p.col + 1, BOARD_COLS - 1) }),
    [KEY.UP]: (p) => ({ ...p, row: Math.max(p.row - 1, 0) }),
    [KEY.DOWN]: (p) => ({ ...p, row: Math.min(p.row + 1, BOARD_ROWS - 1) })
};

const TIMELIMIT = {
    0: 5000,
    1: 4000,
    2: 3000,
    3: 2000,
    4: 1000
};

const EXP = {
    0: 24,
    1: 36,
    2: 48,
    3: 60,
    4: 0
};

[KEY, MOVES, TIMELIMIT, EXP].forEach(item => Object.freeze(item));