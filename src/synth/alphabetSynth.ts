const alphabet: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const frequencyRange: number[] = [110, 1760];

const normalize = (x: number, xRange: number[], newRange: number[]) => {
  const a = newRange[0];
  const b = newRange[1];
  const minX = xRange[0];
  const maxX = xRange[1];
  const res = a + ((x - minX) * (b - a)) / (maxX - minX); // normalization algorithm
  return res;
};

// function makeSynthPitches(alphabetArray: string[], freqRange: number[]) {
//   const testFrequencies = [
//     20.00, 24.36, 29.68, 36.16, 44.04, 53.65, 65.36, 79.62,
//     96.99, 118.16, 143.94, 175.34, 213.60, 260.21, 316.98,
//     386.14, 470.39, 573.02, 698.05, 850.36, 1035.89, 1261.91,
//     1537.25, 1872.66, 2281.25, 2778.99, 3385.33, 4123.97,
//     5023.77, 6119.90, 7455.19, 9081.82, 11063.36, 13477.25,
//     16417.83, 20000.00
//   ];
//   let result: number[] = [];
//   for (let i = 0; i < alphabetArray.length; i++) {
//     result.push(normalize(i + 1, [1, alphabetArray.length], freqRange));
//   }
//   return testFrequencies;
// }

function generateFrequencies(alphabetArray: string[], freqRange: number[]) {
  // steps, startFreq, endFreq
  let steps = alphabetArray.length;
  let startFreq = freqRange[0];
  let endFreq = freqRange[1];
  const frequencies = [];
  for (let i = 0; i < steps; i++) {
    const frequency =
      startFreq * Math.pow(endFreq / startFreq, i / (steps - 1));
    frequencies.push(frequency);
  }
  return frequencies;
}

const synthPitches = generateFrequencies(alphabet, frequencyRange);

export { synthPitches, alphabet, frequencyRange };
