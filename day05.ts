type CoordXY = {
  x: number;
  y: number;
};

type VentLine = {
  start: CoordXY;
  end: CoordXY;
};

function parseCoordString(input: string): CoordXY {
  const numberStrArray = input.split(',');
  return {
    x: parseInt(numberStrArray[0], 10),
    y: parseInt(numberStrArray[1], 10)
  };
}

function getCoordString(coord: CoordXY): string {
  return `${coord.x},${coord.y}`
}

function runDay5Logic(input: string): [number, number] {
  const inputArray: Array<VentLine> = input.trimEnd().split('\n').map(str => {
    const inputStrElements = str.split(' -> ');
    return {
      start: parseCoordString(inputStrElements[0]), end: parseCoordString(inputStrElements[1])
    };
  });

  // DEBUG
  // console.log(inputArray);

  const oceanFloorMapPart1 = new Map<string, number>(), oceanFloorMapPart2 = new Map<string, number>();

  for (const { start, end } of inputArray) {
    if (start.x === end.x) {
      // Vertical vent lines
      for (var i = Math.min(start.y, end.y); i <= Math.max(start.y, end.y); i++) {
        const coordStr = getCoordString({ x: start.x, y: i });
        oceanFloorMapPart1.set(coordStr, (oceanFloorMapPart1.get(coordStr) || 0) + 1);
        oceanFloorMapPart2.set(coordStr, (oceanFloorMapPart2.get(coordStr) || 0) + 1);
      }
    } else if (start.y === end.y) {
      // Horizontal vent lines
      for (var i = Math.min(start.x, end.x); i <= Math.max(start.x, end.x); i++) {
        const coordStr = getCoordString({ x: i, y: start.y });
        oceanFloorMapPart1.set(coordStr, (oceanFloorMapPart1.get(coordStr) || 0) + 1);
        oceanFloorMapPart2.set(coordStr, (oceanFloorMapPart2.get(coordStr) || 0) + 1);
      }
    } else {
      // Perfectly diagonal vent lines
      const xIncrement = start.x > end.x ? -1 : 1, yIncrement = start.y > end.y ? -1 : 1;
      for (var i = 0; i <= Math.abs(start.x - end.x); i++) {
        const coordStr = getCoordString({ x: start.x + (i * xIncrement), y: start.y + (i * yIncrement) });
        oceanFloorMapPart2.set(coordStr, (oceanFloorMapPart2.get(coordStr) || 0) + 1);
      }
    }
  }

  // DEBUG
  // console.log(oceanFloorMap);

  return [Array.from(oceanFloorMapPart1.values()).filter(count => count > 1).length, Array.from(oceanFloorMapPart2.values()).filter(count => count > 1).length];
}

const day5TestData =
  `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

function day5Test() {
  console.log("\nTEST\n");

  const answerKey = [5, 12];

  const answer = runDay5Logic(day5TestData);

  answer[0] === answerKey[0]
    ? console.log("Part 1 Test passed!!")
    : console.log(`PART 1 TEST FAILED!! Expected answer: ${answerKey[0]}. Received answer: ${answer[0]}`);

  answer[1] === answerKey[1]
    ? console.log("Part 2 Test passed!!")
    : console.log(`PART 2 TEST FAILED!! Expected answer: ${answerKey[1]}. Received answer: ${answer[1]}`);
}

function day5() {
  const input: string = require('fs').readFileSync('./input05.txt', 'utf8');

  console.log("\nACTUAL\n");

  console.log(runDay5Logic(input));
}

day5Test();
day5();
