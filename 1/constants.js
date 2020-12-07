'use strict';

const MAX_LEVEL = 4;

const BOARD_COLS = 3;
const BOARD_ROWS = 13;
const BOARD_COL_SIZE = 360;
const BOARD_ROW_SIZE = 180;
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
    RIGHT: 39,
    DOWN: 40,
    P: 80
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
    1: 4300,
    2: 3500,
    3: 2400,
    4: 1500
};

const EXP = {
    0: 30,
    1: 50,
    2: 70,
    3: 100,
    4: 0
};

[COLORS, KEY, COLORCOUNTS, DROPCYCLE, EXP].forEach(item => Object.freeze(item));