'use strict';

const MAX_LEVEL = 4;

const BOARD_COLS = 3;
const BOARD_ROWS = 4;
const BOARD_COL_SIZE = 360;
const BOARD_ROW_SIZE = 360;
const BOARD_CELL_PADDING = 0.05;
const BOARD_CELL_RADIUS = 10;
const BOARD_CELL_BG = '#000000';
const BOARD_CELL_COLOR = '#ffffff';
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
    RIGHT: 39,
    DOWN: 40,
    P:80
};

const NUMS = {
    0: 2,
    1: 4,
    2: 6,
    3: 8,
    4: 10
};

const RANGES = {
    0: 1,
    1: 4,
    2: 9,
    3: 16,
    4: 25
};

const TIMELIMIT = {
    0: 10000,
    1: 9000,
    2: 8000,
    3: 7000,
    4: 6000
};

const EXP = {
    0: 5,
    1: 10,
    2: 15,
    3: 20,
    4: 0
};

[KEY, NUMS, RANGES, TIMELIMIT, EXP].forEach(item => Object.freeze(item));