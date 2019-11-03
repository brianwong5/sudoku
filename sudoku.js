/**
 * Check if an array contains any duplicates.
 *
 * @param {array} array - The array to check.
 * @param {*} [omit=0] - Item to skip if its in the array.
 * @return {boolean} Whether array contains any duplicates.
 */
const checkDuplicates = (array, omit = 0) => {
  const seen = [];
  return array.some(item => {
    if(item === omit) return false;
    if (seen.includes(item)) return true;
    seen.push(item);
    return false;
  });
}

/**
 * Determines if the board is legal. Each row, column and box can only
 * contain each number [1, 9] exactly once.
 *
 * @param {array} board - The board to check.
 * @return {boolean} Whether the board is legal.
 */
const isLegalBoard = board => {
  const anyDuplicates = group => group.some(x => checkDuplicates(x))
  // check rows
  if (anyDuplicates(board)) return false;

  // check columns
  const columns = board.map((x, i) => board.map(x => x[i]));
  if (anyDuplicates(columns)) return false;

  // check boxes
  const getBoxIndex = (i, j) => Math.floor(j / 3) + Math.floor(i / 3) * 3;
  const boxes = board.map(x => []);
  board.forEach((row, i) =>
    row.forEach((x, j) => boxes[getBoxIndex(i, j)].push(board[i][j]))
  );
  if (anyDuplicates(boxes)) return false;
  return true;
}

/**
 * Converts board to printable format.
 *
 * @param {array} board - The board to convert.
 * @return {string} Board in ascii.
 */
const toPrintable = board => board.reduce((acc, row, rowNum) => {
  if (rowNum && rowNum % 3 == 0) acc += "---+---+---\n";
  row.forEach((x, i) => {
    if (i && i % 3 == 0) acc += "|";
    acc += x ? x : " ";
  });
  acc += "\n";
  return acc;
}, "");

/**
 * Gets the next empty cell in the board. Ordering is left to right, top to bottom.
 *
 * @param {array} board - The board to get a cell from.
 * @return {object} Object containing x and y coordinates of the cell.
 */
const getNextCell = board => {
  const index = board.flat().findIndex(x => x === 0);
  return index >= 0 ? { x: index % 9, y: Math.floor(index / 9)} : null;
}

/**
 * Recursively solves a sudoku board via brute force.
 *
 * @param {array} board - The board to solve.
 * @param {boolean} [debug = false] - Whether or not to print the board.
 * @return {array} A solution to the board if there is one.
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
}

module.exports = {
  checkDuplicates,
  isLegalBoard,
  toPrintable,
  getNextCell,
  solve
}
