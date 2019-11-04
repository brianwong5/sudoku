/**
 * Sudoku solver.
 * @module sudoku
 */

/**
 * Check if an array contains any duplicates.
 *
 * @param {array} array - The array to check.
 * @param {*} [omit=0] - Item to skip if it's in the array.
 * @return {boolean} Whether array contains any duplicates.
 */
const checkDuplicates = (array, omit = 0) =>
  array
    .filter(x => x !== omit)
    .some((x, i, arr) => arr.indexOf(x) === i ? false : true);

/**
 * Determines if the board is legal. Each row, column and box can only
 * contain each number [1, 9] exactly once.
 *
 * @param {array} board - The board to check.
 * @return {boolean} Whether the board is legal.
 */
const isLegalBoard = board => {
  const anyDuplicates = group => group.some(x => checkDuplicates(x));

  // check rows
  if (anyDuplicates(board)) return false;

  // check columns
  const columns = board.map((x, i) => board.map(x => x[i]));
  if (anyDuplicates(columns)) return false;

  // check boxes
  const getBoxIndex = (i, j) => Math.floor(j / 3) + Math.floor(i / 3) * 3;
  const boxes = board.map(() => []);
  board.forEach((x, i) => x.forEach((x, j) => boxes[getBoxIndex(i, j)].push(x)));
  return !anyDuplicates(boxes);
};

/**
 * Converts board to printable format.
 *
 * @param {array} board - The board to convert.
 * @return {string} Board in ascii.
 */
const toPrintable = board => board
  ? board.reduce((acc, row, rowNum) =>
    acc + (rowNum && !(rowNum % 3) ? "---+---+---\n" : "") +
    row.reduce((acc, x, i) => acc + (i && !(i % 3) ? "|" : "") + (x ? x : " "), "") +
    "\n", "")
  : "Invalid board";

/**
 * Gets the next empty cell in the board. Ordering is left to right, top to bottom.
 *
 * @param {array} board - The board to get a cell from.
 * @return {object} Object containing x and y coordinates of the cell.
 */
const getNextCell = board => {
  const index = board.flat().findIndex(x => x === 0);
  return index >= 0 ? { x: index % 9, y: Math.floor(index / 9)} : null;
};

/**
 * Recursively solves a sudoku board via brute force.
 *
 * @param {array} board - The board to solve.
 * @param {boolean} [debug=false] - Whether or not to print the board.
 * @return {array|boolean} A solution to the board if there is one. Otherwise false.
 */
const solve = (board, debug = false) => {
  if (!isLegalBoard(board)) return false;
  if (debug) console.log(toPrintable(board));
  const nextCell = getNextCell(board);
  if (!nextCell) return board;
  for (let i = 1; i < 10; ++i) {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[nextCell.y][nextCell.x] = i;
    const result = solve(boardCopy, debug);
    if (result) return result;
  }
};

module.exports = {
  checkDuplicates,
  isLegalBoard,
  toPrintable,
  getNextCell,
  solve
};
