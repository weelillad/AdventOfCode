type BingoCell = {
  num: number;
  marked: boolean;
};

type BingoBoard = BingoCell[][]; // outer array stores rows

function checkBingo(board: BingoBoard): boolean {
  const isColBingo: boolean[] = Array(board.length).fill(true);
  for (const row of board) {
    var isRowBingo = true;
    for (var i = 0; i < row.length; i++) {
      isRowBingo = isRowBingo && row[i].marked;
      isColBingo[i] = isColBingo[i] && row[i].marked;
    }
    if (isRowBingo) return true;
  }
  return isColBingo.reduce((isBingo, colBingo) => isBingo || colBingo, false);
}

function processBingoDraw(drawnNum: number, board: BingoBoard): BingoBoard {
  for (const row of board) {
    for (const cell of row) {
      cell.marked = cell.marked || cell.num === drawnNum;
    }
  }

  return board;
}

function getUnmarkedSum(board: BingoBoard): number {
  return board.reduce((sum, row) =>
    sum + row.reduce((rowSum, cell) =>
      rowSum + (cell.marked ? 0 : cell.num), 0
    ), 0);
}

function runDay4Logic(input: string): [number, number] {
  // Process input
  input = input.trimEnd(); // remove trailing whitespace
  const inputGroups = input.split('\n\n');

  const drawSequence = inputGroups[0].split(',').map(str => parseInt(str, 10));
  var bingoBoards: BingoBoard[] = inputGroups.slice(1).map(rawBoard =>
    rawBoard.split('\n').map(boardLine =>
      boardLine.trimStart().split(/\s+/).map(numStr => {
        return { num: parseInt(numStr, 10), marked: false };
      })
    )
  );

  // DEBUG
  // console.log(inputGroups);
  // console.log(drawSequence);
  // for (const board of bingoBoards) console.log(board);

  var unmarkedSumPart1 = 0, winningNumPart1 = 0, unmarkedSumPart2 = 0, winningNumPart2 = 0;
  for (const drawnNum of drawSequence) {
    bingoBoards = bingoBoards.map(board => processBingoDraw(drawnNum, board));

    // DEBUG
    // if (drawnNum === 24) {
    //   for (const board of bingoBoards) console.log(board);
    // }

    bingoBoards = bingoBoards.filter((board, _, array) => {
      if (checkBingo(board)) {
        if (winningNumPart1 === 0) {
          winningNumPart1 = drawnNum;
          unmarkedSumPart1 = getUnmarkedSum(board);
        }
        if (array.length === 1) {
          winningNumPart2 = drawnNum;
          unmarkedSumPart2 = getUnmarkedSum(board);
        }
        return false;
      }
      return true;
    });
  }

  // DEBUG
  // console.log(`${unmarkedSumPart1} ${winningNumPart1}`);

  return [unmarkedSumPart1 * winningNumPart1, unmarkedSumPart2 * winningNumPart2];
}

const day4TestData =
  `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

const day4TestData2 =
  `22,8,21,6,1,7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

function day4Test() {
  console.log("\nTEST\n");

  const answerKey = [4512, 1924];

  const answer = runDay4Logic(day4TestData);

  answer[0] === answerKey[0]
    ? console.log("Part 1 Test passed!!")
    : console.log(`PART 1 TEST FAILED!! Expected answer: ${answerKey[0]}. Received answer: ${answer[0]}`);

  answer[1] === answerKey[1]
    ? console.log("Part 2 Test passed!!")
    : console.log(`PART 2 TEST FAILED!! Expected answer: ${answerKey[1]}. Received answer: ${answer[1]}`);
}

function day4() {
  const input: string = require('fs').readFileSync('./input04.txt', 'utf8');

  console.log("\nACTUAL\n");

  console.log(runDay4Logic(input));
}

day4Test();
day4();
