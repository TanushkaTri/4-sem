class Sudoku {
  private readonly N: number;
  private readonly K: number;
  private readonly SRN: number;
  private mat: number[][];

  constructor(N: number, K: number) {
    this.N = N;
    this.K = K;

    // Compute square root of N
    const SRNd = Math.sqrt(N);
    this.SRN = Math.floor(SRNd);

    // Initialize all entries as false to indicate
    // that there are no edges initially
    this.mat = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => 0)
    );
  }

  // Sudoku Generator
  fillValues(): void {
    // Fill the diagonal of SRN x SRN matrices
    this.fillDiagonal();

    // Fill remaining blocks
    this.fillRemaining(0, this.SRN);

    // Remove Randomly K digits to make game
    this.removeKDigits();
  }

  // Fill the diagonal SRN number of SRN x SRN matrices
  private fillDiagonal(): void {
    for (let i = 0; i < this.N; i += this.SRN) {
      // for diagonal box, start coordinates->i==j
      this.fillBox(i, i);
    }
  }

  // Returns false if given 3 x 3 block contains num.
  private unUsedInBox(
    rowStart: number,
    colStart: number,
    num: number
  ): boolean {
    for (let i = 0; i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        if (this.mat[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  // Fill a 3 x 3 matrix.
  private fillBox(row: number, col: number): void {
    let num = 0;
    for (let i = 0; i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        while (true) {
          num = this.randomGenerator(this.N);
          if (this.unUsedInBox(row, col, num)) {
            break;
          }
        }
        this.mat[row + i][col + j] = num;
      }
    }
  }

  // Random generator
  private randomGenerator(num: number): number {
    return Math.floor(Math.random() * num + 1);
  }

  // Check if safe to put in cell
  private checkIfSafe(i: number, j: number, num: number): boolean {
    return (
      this.unUsedInRow(i, num) &&
      this.unUsedInCol(j, num) &&
      this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
    );
  }

  // check in the row for existence
  private unUsedInRow(i: number, num: number): boolean {
    for (let j = 0; j < this.N; j++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // check in the row for existence
  private unUsedInCol(j: number, num: number): boolean {
    for (let i = 0; i < this.N; i++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // A recursive function to fill remaining
  // matrix
  private fillRemaining(i: number, j: number): boolean {
    // Check if we have reached the end of the matrix
    if (i === this.N - 1 && j === this.N) {
      return true;
    }

    // Move to the next row if we have reached the end of the current row
    if (j === this.N) {
      i += 1;
      j = 0;
    }

    // Skip cells that are already filled
    if (this.mat[i][j] !== 0) {
      return this.fillRemaining(i, j + 1);
    }

    // Try filling the current cell with a valid value
    for (let num = 1; num <= this.N; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.mat[i][j] = num;
        if (this.fillRemaining(i, j + 1)) {
          return true;
        }
        this.mat[i][j] = 0;
      }
    }

    // No valid value was found, so backtrack
    return false;
  }

  // Print sudoku
  printSudoku(): void {
    for (let i = 0; i < this.N; i++) {
      console.log(this.mat[i].join(" "));
    }
  }

  // Remove the K no. of digits to
  // complete game
  private removeKDigits(): void {
    let count = this.K;

    while (count !== 0) {
      // extract coordinates i and j
      let i = Math.floor(Math.random() * this.N);
      let j = Math.floor(Math.random() * this.N);
      if (this.mat[i][j] !== 0) {
        count--;
        this.mat[i][j] = 0;
      }
    }

    return;
  }

  public getSudoku(): number[][] {
    return this.mat;
  }
}

function sudokuGen(empty_cells: number): number[][] {
  let sudoku: Sudoku = new Sudoku(9, empty_cells);
  sudoku.fillValues();
  let mat = sudoku.getSudoku();
  return mat;
}

export default sudokuGen;
