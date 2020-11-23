'use strict';

const COLS = 6;
const ROWS = 13;
const ROW_SIZE = 60;
const COL_SIZE = 120;
const MAX_LEVEL = 4;
const BORDER = 2;

const COLORS = [
    'none',
    '#DF6464', // 빨
    '#567795', // 파
    '#C9BC46', // 노
    '#3CB371', // 초
    '#6B4784', // 보
    '#A0D468' // 연
];

const KEY = {
    ESC: 27,
    SPACE: 32,
    P: 80
};

const SHAPES = [
    [],
    [[1]],
    [[2]],
    [[3]],
    [[4]],
    [[5]],
    [[6]]
];

const LEVEL = {
    0: 3000,
    1: 2500,
    2: 2000,
    3: 1500,
    4: 1000
};

[COLORS, KEY, SHAPES, LEVEL].forEach(item => Object.freeze(item));