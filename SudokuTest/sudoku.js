function validSolution(board) {
  // Перевірка розміру дошки
  if (board.length !== 9 || board.some((row) => row.length !== 9)) {
    return false;
  }

  // Перевірка на допустимі значення (0-9)
  if (
    board.some((row) =>
      row.some((cell) => !Number.isInteger(cell) || cell < 0 || cell > 9)
    )
  ) {
    return false;
  }

  // Окрема перевірка на наявність нулів
  if (board.some((row) => row.some((cell) => cell === 0))) {
    return false;
  }

  // Допоміжна функція для перевірки унікальності чисел від 1 до 9
  function isValidSet(numbers) {
    if (numbers.length !== 9) return false;
    const validNumbers = numbers.filter((num) => num >= 1 && num <= 9);
    const set = new Set(validNumbers);
    return set.size === 9 && validNumbers.length === 9;
  }

  // Перевірка рядків
  if (!board.every((row) => isValidSet(row))) {
    return false;
  }

  // Перевірка стовпців
  for (let col = 0; col < 9; col++) {
    const column = board.map((row) => row[col]);
    if (!isValidSet(column)) {
      return false;
    }
  }

  // Перевірка блоків 3x3
  for (let blockRow = 0; blockRow < 9; blockRow += 3) {
    for (let blockCol = 0; blockCol < 9; blockCol += 3) {
      const block = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          block.push(board[blockRow + i][blockCol + j]);
        }
      }
      if (!isValidSet(block)) {
        return false;
      }
    }
  }

  return true;
}

// Тестові приклади
const test1 = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const test2 = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 0, 3, 4, 8],
  [1, 0, 0, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 0],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 0, 1, 5, 3, 7, 2, 1, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 0, 0, 4, 8, 1, 1, 7, 9],
];

// Виведення результатів тестів
function runTest(testCase, testNumber) {
  console.log(`\nTest ${testNumber}:`);
  console.log("Input board:");
  testCase.forEach((row) => console.log(row.join(" ")));
  const result = validSolution(testCase);
  console.log(`\nResult: ${result}`);
  console.log("------------------------");
}

// Запуск тестів
console.log("Running Sudoku Validator Tests...");
runTest(test1, 1); // Повинно повернути true
runTest(test2, 2); // Повинно повернути false

// Додатковий тест з повторюваними числами в рядку
const test3 = [
  [1, 1, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];
runTest(test3, 3); // Повинно повернути false
