type LineBinaryClassifierOutput = {
  zeroes: Array<string>;
  ones: Array<string>;
};

function lineBinaryClassifier(inputArray: Array<string>, sortPosition: number): LineBinaryClassifierOutput {
  const answer: LineBinaryClassifierOutput = {
    zeroes: [],
    ones: []
  };

  for (const line of inputArray) {
    line[sortPosition] === '1'
      ? answer.ones.push(line)
      : answer.zeroes.push(line);
  }

  return answer;
}

function runDay3Logic(input: string): [number, number] {
  const inputArray: Array<string> = input.split('\n');

  // Remove blank last line
  inputArray.pop()

  const inputLineLength = inputArray[0].length;

  // DEBUG
  // console.log(inputArray);
  // console.log(inputLineLength);

  // PART 1

  var oneCounts = Array(inputLineLength);
  oneCounts.fill(0);
  for (const line of inputArray) {
    for (var i = 0; i < inputLineLength; i++) {
      line[i] === '1' && oneCounts[i]++;
    }
  }

  const threshold = inputArray.length / 2;
  var gammaPart1 = 0, epsilonPart1 = 0;
  for (var i = 0; i < inputLineLength; i++) {
    oneCounts[i] > threshold
      ? gammaPart1 += Math.pow(2, inputLineLength - i - 1)
      : epsilonPart1 += Math.pow(2, inputLineLength - i - 1);
  }

  // PART 2

  const sortedLines = lineBinaryClassifier(inputArray, 0);

  var oxyCandidatesPart2 = oneCounts[0] >= threshold ? sortedLines.ones : sortedLines.zeroes;
  var co2CandidatesPart2 = oneCounts[0] >= threshold ? sortedLines.zeroes : sortedLines.ones;

  for (var i = 1; i < inputLineLength; i++) {
    if (oxyCandidatesPart2.length <= 1) break;

    const sortedLines = lineBinaryClassifier(oxyCandidatesPart2, i)

    oxyCandidatesPart2 = sortedLines.ones.length >= sortedLines.zeroes.length ? sortedLines.ones : sortedLines.zeroes;
  }

  for (var i = 1; i < inputLineLength; i++) {
    if (co2CandidatesPart2.length <= 1) break;

    const sortedLines = lineBinaryClassifier(co2CandidatesPart2, i)

    co2CandidatesPart2 = sortedLines.ones.length >= sortedLines.zeroes.length ? sortedLines.zeroes : sortedLines.ones;
  }

  // DEBUG
  // console.log(`${threshold} ${oneCounts}`)
  // console.log(`${oxyCandidatesPart2[0]} ${co2CandidatesPart2[0]}`)

  return [gammaPart1 * epsilonPart1, parseInt(oxyCandidatesPart2[0], 2) * parseInt(co2CandidatesPart2[0], 2)];
}

const day3TestData =
  `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

function day3Test() {
  console.log("\nTEST\n");

  const answerKey = [198, 230];

  const answer = runDay3Logic(day3TestData);

  answer[0] === answerKey[0]
    ? console.log("Part 1 Test passed!!")
    : console.log(`PART 1 TEST FAILED!! Expected answer: ${answerKey[0]}. Received answer: ${answer[0]}`);

  answer[1] === answerKey[1]
    ? console.log("Part 2 Test passed!!")
    : console.log(`PART 2 TEST FAILED!! Expected answer: ${answerKey[1]}. Received answer: ${answer[1]}`);
}

function day3() {
  const input: string = require('fs').readFileSync('./input03.txt', 'utf8');

  console.log("\nACTUAL\n");

  console.log(runDay3Logic(input));
}

day3Test();
day3();
