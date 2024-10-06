export function createAsyncLoop(
  callback: any,
  array: string[],
  startingIndex: number,
  minDelay: number,
  maxDelay: number
): { start: () => void; stop: () => void } {
  console.log('createAsyncLoop: ', array.length)
  let active = true;
  let delay: number;
  let index: number = startingIndex;
  const loop = async () => {
    while (active) {
      delay = Math.random() * (maxDelay - minDelay) + minDelay;
      await callback(array[index], 3, 3); // Wait for the async callback to complete
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay between iterations
      index = (index + 1) % array.length
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
