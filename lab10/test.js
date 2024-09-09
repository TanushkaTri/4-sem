var _a;
var CELL_STATES;
(function (CELL_STATES) {
    CELL_STATES[CELL_STATES["INITIAL"] = -1] = "INITIAL";
    CELL_STATES[CELL_STATES["INSERTED_CORRECT"] = 1] = "INSERTED_CORRECT";
    CELL_STATES[CELL_STATES["INSERTED_INCORRECT"] = 2] = "INSERTED_INCORRECT";
    CELL_STATES[CELL_STATES["ON_INCORRECT_PATH"] = 3] = "ON_INCORRECT_PATH";
    CELL_STATES[CELL_STATES["EMPTY"] = 0] = "EMPTY";
})(CELL_STATES || (CELL_STATES = {}));
function Step(selectedCell, value, currentField, states) {
    var i = selectedCell.i, j = selectedCell.j;
    // Check if the value is already present in the same row, column, or 3x3 block
    var isValid = isValidMove(i, j, value, currentField);
    if (!isValid) {
        // Mark the selected cell as incorrect
        states[i][j] = CELL_STATES.INSERTED_INCORRECT;
        // Mark cells in the same row, column, and 3x3 block as incorrect path
        markIncorrectPath(i, j, value, states);
    }
    else {
        // Update the selected cell with the new value
        currentField[i][j] = value;
        // Mark the selected cell as correct
        states[i][j] = CELL_STATES.INSERTED_CORRECT;
    }
    return [currentField, states];
}
function isValidMove(i, j, value, currentField) {
    var blockStartRow = Math.floor(i / 3) * 3;
    var blockStartCol = Math.floor(j / 3) * 3;
    // Check row
    if (currentField[i].includes(value))
        return false;
    // Check column
    if (currentField.some(function (row) { return row[j] === value; }))
        return false;
    // Check 3x3 block
    for (var row = blockStartRow; row < blockStartRow + 3; row++) {
        for (var col = blockStartCol; col < blockStartCol + 3; col++) {
            if (currentField[row][col] === value)
                return false;
        }
    }
    return true;
}
function markIncorrectPath(i, j, value, states) {
    var blockStartRow = Math.floor(i / 3) * 3;
    var blockStartCol = Math.floor(j / 3) * 3;
    // Mark cells in the same row as incorrect path
    for (var col = 0; col < 9; col++) {
        if (col !== j &&
            (states[i][col] === CELL_STATES.INSERTED_CORRECT ||
                states[i][col] === CELL_STATES.INITIAL)) {
            states[i][col] = CELL_STATES.ON_INCORRECT_PATH;
        }
    }
    // Mark cells in the same column as incorrect path
    for (var row = 0; row < 9; row++) {
        if (row !== i &&
            (states[row][j] === CELL_STATES.INSERTED_CORRECT ||
                states[row][j] === CELL_STATES.INITIAL)) {
            states[row][j] = CELL_STATES.ON_INCORRECT_PATH;
        }
    }
    // Mark cells in the same 3x3 block as incorrect path
    for (var row = blockStartRow; row < blockStartRow + 3; row++) {
        for (var col = blockStartCol; col < blockStartCol + 3; col++) {
            if (row !== i &&
                col !== j &&
                (states[row][col] === CELL_STATES.INSERTED_CORRECT ||
                    states[row][col] === CELL_STATES.INITIAL)) {
                states[row][col] = CELL_STATES.ON_INCORRECT_PATH;
            }
        }
    }
}
//////////////////////////////////
var field = [
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
var states = [
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
var new_field;
var new_states;
_a = Step({ i: 7, j: 3 }, 2, field, states), new_field = _a[0], new_states = _a[1];
var msg = "";
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
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
