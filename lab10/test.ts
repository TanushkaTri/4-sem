enum CELL_STATES {
  INITIAL = -1,
  INSERTED_CORRECT = 1,
  INSERTED_INCORRECT = 2,
  ON_INCORRECT_PATH = 3,
  EMPTY = 0,
}

type Cell = { i: number; j: number };

function Step(
  selectedCell: Cell,
  value: number,
  currentField: number[][],
  states: CHECK_STATE[][]
): [number[][], CHECK_STATE[][]] {
  const { i, j } = selectedCell;

  let isValidRow: boolean;
  let isValidCol: boolean;
  let isValidBlock: boolean;

  // Check if the value is already present in the same row, column, or 3x3 block
  [isValidRow, isValidCol, isValidBlock] = isValidMove(
    i,
    j,
    value,
    currentField
  );

  if (!isValidRow || !isValidCol || !isValidBlock) {
    // Mark the selected cell as incorrect
    states[i][j] = CHECK_STATE.INCORRECT;

    // Mark cells in the same row, column, and 3x3 block as incorrect path
    markIncorrectPath(i, j, states, isValidRow, isValidCol, isValidBlock);
  } else {
    // Update the selected cell with the new value

    // Mark the selected cell as correct
    states[i][j] = CHECK_STATE.CORRECT;
  }

  currentField[i][j] = value;

  return [currentField, states];
}

function isValidMove(
  i: number,
  j: number,
  value: number,
  currentField: number[][]
): [boolean, boolean, boolean] {
  const blockStartRow = Math.floor(i / 3) * 3;
  const blockStartCol = Math.floor(j / 3) * 3;

  let isValidRow = true;
  let isValidCol = true;
  let isValidBlock = true;

  // Check row
  if (currentField[i].includes(value)) isValidRow = false;

  // Check column
  if (currentField.some((row) => row[j] === value)) isValidCol = false;

  // Check 3x3 block
  for (let row = blockStartRow; row < blockStartRow + 3; row++) {
    for (let col = blockStartCol; col < blockStartCol + 3; col++) {
      if (currentField[row][col] === value) isValidBlock = false;
    }
  }

  return [isValidRow, isValidCol, isValidBlock];
}

function markIncorrectPath(
  i: number,
  j: number,
  states: CHECK_STATE[][],
  isValidRow: boolean,
  isValidCol: boolean,
  isValidBlock: boolean
): void {
  const blockStartRow = Math.floor(i / 3) * 3;
  const blockStartCol = Math.floor(j / 3) * 3;

  // Mark cells in the same row as incorrect path
  if (!isValidRow) {
    for (let col = 0; col < 9; col++) {
      if (col !== j && states[i][col] === CHECK_STATE.CORRECT) {
        states[i][col] = CHECK_STATE.INCRORRECT_PATH;
      }
    }
  }

  if (!isValidCol) {
    // Mark cells in the same column as incorrect path
    for (let row = 0; row < 9; row++) {
      if (row !== i && states[row][j] === CHECK_STATE.CORRECT) {
        states[row][j] = CHECK_STATE.INCRORRECT_PATH;
      }
    }
  }

  if (!isValidBlock) {
    // Mark cells in the same 3x3 block as incorrect path
    for (let row = blockStartRow; row < blockStartRow + 3; row++) {
      for (let col = blockStartCol; col < blockStartCol + 3; col++) {
        if (
          row !== i &&
          col !== j &&
          states[row][col] === CHECK_STATE.CORRECT
        ) {
          states[row][col] = CHECK_STATE.INCRORRECT_PATH;
        }
      }
    }
  }
}

//////////////////////////////////

let field = [
  [9, 5, 8, 1, 3, 2, 4, 7, 6],
  [6, 7, 4, 8, 9, 5, 2, 1, 3],
  [3, 1, 2, 4, 7, 6, 8, 5, 9],
  [1, 9, 5, 3, 2, 4, 7, 6, 8],
  [2, 3, 7, 5, 6, 8, 9, 4, 1],
  [4, 8, 6, 7, 1, 9, 5, 3, 2],
  [8, 6, 1, 2, 4, 7, 3, 9, 5],
  [5, 4, 9, 0, 8, 3, 1, 2, 7],
  [7, 2, 3, 9, 5, 1, 6, 8, 4],
];

let states = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, 0, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

let new_field: number[][];
let new_states: CELL_STATES[][];
[new_field, new_states] = Step({ i: 7, j: 3 }, 2, field, states);

let msg: string = "";

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    msg += new_states[i][j] + " ";
  }
  msg += "\n";
}

console.log(msg);

// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1
// -1 -1 -1 1 -1 -1 -1 -1 -1
// -1 -1 -1 -1 -1 -1 -1 -1 -1

// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 -1 -1 -1 -1 -1
// -1 -1 -1 3 3 3 -1 -1 -1
// 3 3 3 2 3 3 3 3 3
// -1 -1 -1 3 3 3 -1 -1 -1
