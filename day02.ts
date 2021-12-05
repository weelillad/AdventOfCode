type Day2Input = {
  direction: string;
  distance: number;
};

function runDay2Logic(input: string): [number, number] {
  const inputArray: Array<Day2Input> = input.split('\n').map(str => {
    const inputStrElements = str.split(' ');
    return {direction: inputStrElements[0], distance: parseInt(inputStrElements[1], 10)};
  });

  // Remove blank last line
  inputArray.pop()

  // DEBUG
  // console.log(inputArray);

  var posPart1 = 0, depthPart1 = 0, posPart2 = 0, depthPart2 = 0, aimPart2 = 0;
  for (const instruction of inputArray) {
    switch (instruction.direction) {
      case 'forward':
        posPart1 += instruction.distance;
        posPart2 += instruction.distance;
        depthPart2 += instruction.distance * aimPart2;
        break;
      case 'up':
        depthPart1 -= instruction.distance;
        aimPart2 -= instruction.distance;
        break;
      case 'down':
        depthPart1 += instruction.distance;
        aimPart2 += instruction.distance;
        break;
      default:
        console.log(`ERROR: Unrecognised direction: ${instruction.direction}`);
        return [0,0];
    }
  }

  return [posPart1 * depthPart1, posPart2 * depthPart2];
}

const day2TestData =
  `forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

function day2Test() {
  console.log("\nTEST\n");

  const answerKey = [150,900];

  const answer = runDay2Logic(day2TestData);

  answer[0] === answerKey[0]
    ? console.log("Part 1 Test passed!!")
    : console.log(`PART 1 TEST FAILED!! Expected answer: ${answerKey[0]}. Received answer: ${answer[0]}`);

  answer[1] === answerKey[1]
    ? console.log("Part 2 Test passed!!")
    : console.log(`PART 2 TEST FAILED!! Expected answer: ${answerKey[1]}. Received answer: ${answer[1]}`);
}

function day2() {
  const input: string = require('fs').readFileSync('./input02.txt', 'utf8');

  console.log("\nACTUAL\n");

  console.log(runDay2Logic(input));
}

day2Test();
day2();
