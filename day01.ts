function runDay1Logic(input: string): [number, number] {
  const inputArray: Array<number> = input.split('\n').map(str => parseInt(str, 10));

  var numIncreasePart1 = 0, numIncreasePart2 = 0;
  for (var i = 1; i < inputArray.length; i++) {
    inputArray[i] > inputArray[i-1] && numIncreasePart1++;
    i >= 3 && inputArray[i] > inputArray[i-3] && numIncreasePart2++;
  }

  return [numIncreasePart1, numIncreasePart2];
}

const day1TestData =
  `199
200
208
210
200
207
240
269
260
263`;

function day1Test() {
  console.log("\nTEST\n");

  const answerKey = [7,5];

  const answer = runDay1Logic(day1TestData);

  answer[0] === answerKey[0]
    ? console.log("Part 1 Test passed!!")
    : console.log(`PART 1 TEST FAILED!! Expected answer: ${answerKey[0]}. Received answer: ${answer[0]}`);

  answer[1] === answerKey[1]
    ? console.log("Part 2 Test passed!!")
    : console.log(`PART 2 TEST FAILED!! Expected answer: ${answerKey[1]}. Received answer: ${answer[1]}`);
}

function day1() {
  const input: string = require('fs').readFileSync('./input01.txt', 'utf8');

  console.log("\nACTUAL\n");

  console.log(runDay1Logic(input));
}

day1Test();
day1();
