const sudoku = require("./sudoku");
const puzzles = require("./puzzles");

describe("checkDuplicates", () => {
  test("should return false on empty array", () => {
    const input = [];
    expect(sudoku.checkDuplicates(input)).toBeFalsy();
  });
  test("should return false on array without duplicates", () => {
    const input = [1, 2, 3];
    expect(sudoku.checkDuplicates(input)).toBeFalsy();
  });
  test("should return true on array with duplicates", () => {
    const input = [1, 1, 2];
    expect(sudoku.checkDuplicates(input)).toBeTruthy();
  });
});

describe("isLegalBoard", () => {
  test("should return true on a base puzzle", () => {
    const board = puzzles.easy1.base;
    expect(sudoku.isLegalBoard(board)).toBeTruthy();
  });
  test("should return true on a solved puzzle", () => {
    const board = puzzles.easy1.solution;
    expect(sudoku.isLegalBoard(board)).toBeTruthy();
  });
  test("should return false on a duplicate row", () => {
    const board = puzzles.fake.row;
    expect(sudoku.isLegalBoard(board)).toBeFalsy();
  });
  test("should return false on a duplicate column", () => {
    const board = puzzles.fake.col;
    expect(sudoku.isLegalBoard(board)).toBeFalsy();
  });
  test("should return false on a duplicate box", () => {
    const board = puzzles.fake.box;
    expect(sudoku.isLegalBoard(board)).toBeFalsy();
  });
});

describe("toPrintable", () => {
  test("should return printable format", () => {
    const board = puzzles.easy1.base;
    const output =
    " 96| 4 | 3 \n" +
    " 57|82 |   \n" +
    "1  |9  |5  \n" +
    "---+---+---\n" +
    "  9| 1 |  8\n" +
    "5  |   |  2\n" +
    "4  | 9 |6  \n" +
    "---+---+---\n" +
    "  4|  3|  1\n" +
    "   | 79|26 \n" +
    " 2 | 5 |98 \n";
    expect(sudoku.toPrintable(board)).toBe(output);
  });
});

describe("getNextCell", () => {
  test("should return correct coordinates for non-full boards", () => {
    const board1 = puzzles.easy1.base;
    expect(sudoku.getNextCell(board1)).toStrictEqual({x: 0, y: 0});
    const board2 = puzzles.fake.box;
    expect(sudoku.getNextCell(board2)).toStrictEqual({x: 3, y: 0});
  });
  test("should return null for a full board", () => {
    const board = puzzles.easy1.solution;
    expect(sudoku.getNextCell(board)).toBeNull();
  });
});

describe("solve", () => {
  test("should return false for an illegal board", () => {
    const board = puzzles.fake.row;
    expect(sudoku.solve(board)).toBeFalsy();
  });
  test("should return correct solution for various puzzles", () => {
    for (const puzzle in puzzles) {
      const board = puzzles[puzzle].base;
      const solution = puzzles[puzzle].solution;
      if (board && solution) {
        // console.log(`Solving puzzle: ${puzzle}`);
        expect(sudoku.solve(board)).toStrictEqual(solution);
      }
    }
  });
});
