'use strict';

const COLS = 3;
const ROWS = 4;
const ROW_SIZE = 195;
const COL_SIZE = 120;

const MAX_LEVEL = 4;

const LEVEL = {
    0: 2000,
    1: 1000,
    2: 500,
    3: 300,
    4: 100
};

[LEVEL].forEach(item => Object.freeze(item));