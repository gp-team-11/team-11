'use strict';

const COLS = 3;
const ROWS = 4;
const ROW_SIZE = 360;
const COL_SIZE = 360;
const BORDER = 2;

const MAX_LEVEL = 4;

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
}

const LEVEL = {
    0: 10000,
    1: 9000,
    2: 8000,
    3: 7000,
    4: 6000
};

[COLORS, KEY, NUMS, RANGES, LEVEL].forEach(item => Object.freeze(item));