class Sudoku {
  private readonly N: number;
  private readonly K: number;
  private readonly SRN: number;
  private mat: number[][];

  constructor(N: number, K: number) {
    this.N = N;
    this.K = K;

    // Вычислить квадратный корень из N
    const SRNd = Math.sqrt(N);
    this.SRN = Math.floor(SRNd);

    // Инициализировать все элементы матрицы значением 0
    this.mat = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => 0)
    );
  }

  // Генератор судоку
  fillValues(): void {
    // Заполнить диагонали матриц размером SRN x SRN
    this.fillDiagonal();

    // Заполнить оставшиеся блоки
    this.fillRemaining(0, this.SRN);

    // Удалить случайно K цифр, чтобы создать игру
    this.removeKDigits();
  }

  // Заполнить диагонали матриц размером SRN x SRN
  private fillDiagonal(): void {
    for (let i = 0; i < this.N; i += this.SRN) {
      // для диагонального блока, начальные координаты -> i == j
      this.fillBox(i, i);
    }
  }

  // Возвращает false, если в данном блоке 3 x 3 содержится num
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

  // Заполнить блок 3 x 3
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

  // Случайный генератор
  private randomGenerator(num: number): number {
    return Math.floor(Math.random() * num + 1);
  }

  // Проверка на возможность поместить число в ячейку
  private checkIfSafe(i: number, j: number, num: number): boolean {
    return (
      this.unUsedInRow(i, num) &&
      this.unUsedInCol(j, num) &&
      this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
    );
  }

  // Проверка наличия числа в строке
  private unUsedInRow(i: number, num: number): boolean {
    for (let j = 0; j < this.N; j++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // Проверка наличия числа в столбце
  private unUsedInCol(j: number, num: number): boolean {
    for (let i = 0; i < this.N; i++) {
      if (this.mat[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  // Рекурсивная функция для заполнения оставшейся матрицы
  private fillRemaining(i: number, j: number): boolean {
    // Проверка на достижение конца матрицы
    if (i === this.N - 1 && j === this.N) {
      return true;
    }

    // Перейти к следующей строке, если достигнут конец текущей строки
    if (j === this.N) {
      i += 1;
      j = 0;
    }

     // Пропустить заполненные ячейки
    if (this.mat[i][j] !== 0) {
      return this.fillRemaining(i, j + 1);
    }

    // Попробовать заполнить текущую ячейку допустимым значением
    for (let num = 1; num <= this.N; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.mat[i][j] = num;
        if (this.fillRemaining(i, j + 1)) {
          return true;
        }
        this.mat[i][j] = 0;
      }
    }

    // Не найдено допустимое значение, так что откат
    return false;
  }

  // Print sudoku
  printSudoku(): void {
    for (let i = 0; i < this.N; i++) {
      console.log(this.mat[i].join(" "));
    }
  }

  // Удалить K чисел для игры
  private removeKDigits(): void {
    let count = this.K;

    while (count !== 0) {
      // извлечь координаты i и j
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
