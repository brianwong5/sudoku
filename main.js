const sudoku = require("./sudoku");
const puzzles = require("./puzzles");

const puzzle = puzzles.extreme.base;
console.log(sudoku.toPrintable(puzzle));
const time = new Date();
const solved = sudoku.solve(puzzle);
const total = new Date - time;
console.log(sudoku.toPrintable(solved));
console.log(`Solved in ${total / 1000} seconds.`);
