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
]; // if you want it going from high to low

const frequencyRange: number[] = [110, 1760];
const velocityRange: number[] = [1, -1];

const normalize = (x: number, xRange: number[], newRange: number[]) => {
  const a = newRange[0];
  const b = newRange[1];
  const minX = xRange[0];
  const maxX = xRange[1];
  const res = a + ((x - minX) * (b - a)) / (maxX - minX); // normalization algorithm
  return res;
};

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

function generateVelocities(synthPitches: number[]) {
  return synthPitches.map((pitch: number) => {
    return normalize(pitch, synthPitches, velocityRange);
  });
}

const synthPitches = generateFrequencies(alphabet, frequencyRange);
const synthVelocities = generateVelocities(synthPitches);

export { synthPitches, alphabet, frequencyRange, synthVelocities };
