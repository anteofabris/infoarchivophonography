export function createAsyncLoop(
  callback: any,
  array: string[],
  startingIndex: number,
  sentenceSpacelength: number,
  wordSpaceLength: number,
  letterSpaceLength: number,
): { start: () => void; stop: () => void } {
  console.log("createAsyncLoop: ", array.length);
  let active = true;
  let index: number = startingIndex;
  const loop = async () => {
    while (active) {
      let currentPhrase = array[index];
      let wordSpaces = currentPhrase.split(" ").length - 1;
      let letterSpaces = currentPhrase
        .split(" ")
        .reduce((acc, s) => acc + s.length, 0);
      let phraseLength =
        wordSpaces * wordSpaceLength + letterSpaces * letterSpaceLength;
        console.log('phraselength: ', phraseLength)
      await callback(array[index], sentenceSpacelength, wordSpaceLength, letterSpaceLength); // Wait for the async callback to complete
      await new Promise((resolve) => setTimeout(resolve, phraseLength)); // Delay between iterations
      index = (index + 1) % array.length;
    }
  };

  return {
    start: () => {
      active = true;
      loop();
    }, // Start the loop
    stop: () => {
      active = false;
    }, // Stop the loop
  };
}
