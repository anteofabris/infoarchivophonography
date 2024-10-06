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

const frequencyRange: number[] = [220, 20000];

const normalize = (x: number, xRange: number[], newRange: number[]) => {
  const a = newRange[0];
  const b = newRange[1];
  const minX = xRange[0];
  const maxX = xRange[1];
  const res = a + ((x - minX) * (b - a)) / (maxX - minX); // normalization algorithm
  return res;
};

function makeSynthPitches(alphabetArray: string[], freqRange: number[]) {
  let result: number[] = [];
  for (let i = 0; i < alphabetArray.length; i++) {
    result.push(normalize(i + 1, [1, alphabetArray.length], freqRange));
  }
  return result;
}

const synthPitches = makeSynthPitches(alphabet, frequencyRange);

export { synthPitches, alphabet };
