'use strict';

const COLS = 6;
const ROWS = 8;
const ROW_SIZE = 195;
const COL_SIZE = 120;
const BORDER = 2;

const MAX_LEVEL = 5;

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

const SHAPES = [
    [],
    [[1]],
    [[2]],
    [[3]],
    [[4]],
    [[5]],
    [[6]],
    [[7]]
];

const LEVEL = {
    0: 2000,
    1: 800,
    2: 200,
    3: 100,
    4: 50,
    5: 10
};

[COLORS, SHAPES, LEVEL].forEach(item => Object.freeze(item));