// converting sudoku matrix to 9 3x3 submatrices for separate divs
function modifyMatrix(matrix: number[][]): number[][][][] {
  const modifiedMatrix: number[][][][] = [];

  for (let i = 0; i < 9; i += 3) {
    const row: number[][][] = [];
    for (let j = 0; j < 9; j += 3) {
      const subMatrix: number[][] = [];
      for (let k = 0; k < 3; k++) {
        const subRow: number[] = matrix[i + k].slice(j, j + 3);
        subMatrix.push(subRow);
      }
      row.push(subMatrix);
    }
    modifiedMatrix.push(row);
  }

  return modifiedMatrix;
}

export default modifyMatrix;
