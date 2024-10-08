export function createAsyncLoop(
  callback: any,
  array: string[],
  startingIndex: number,
  sentenceSpacelength: number,
  wordSpaceLength: number
): { start: () => void; stop: () => void } {
  let active = false;
  let index: number = startingIndex;
  const loop = async () => {
    while (active) {
      await callback(array[index], wordSpaceLength); // Wait for the async callback to complete
      await new Promise((resolve) => setTimeout(resolve, sentenceSpacelength)); // Delay between iterations
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
