import * as Tone from "tone";
import { synthPitches, alphabet } from "./alphabetSynth";

// // Instantiate PolySynth
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
// if preferred, set the attributes across all the voices using 'set'
// synth.set({ detune: -1200 });

//*** SYNCHRONOUS FUNCTIONS ***//

// play a note (letter)
function playNote(letter: string, duration: number, offset: number) {
  synth.triggerAttackRelease(
    synthPitches[alphabet.indexOf(letter)],
    duration,
    now + offset
  );
  return null;
}

function durationUnit(num: number) {
  return num;
}

function incrementationUnit(num: number) {
  return num;
}
// play a chord (word)
function playChord(word: string, duration: number, startingOffset: number) {
  // for each letter in word, play the note
  // durations increase, so longer words become more sprawled out
  for (let i = 0; i < word.length; i++) {
    playNote(word[i], duration, startingOffset + durationUnit(i));
  }
  return null;
}

//*** ASYNCHRONOUS FUNCTIONS ***//

// play a pause (space, sentence end)
const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// play a phrase of chords (sentence)
async function playPhrase(
  sentence: string,
  duration: number,
  offset: number,
  spaceDuration: number
) {
  console.log('playPhrase: ', sentence)
  // split sentence into words
  const words = sentence.split(" ");
  const space = async () => await asyncTimeout(spaceDuration * 1000);
  // recursive async function to play words with spaces in between
  async function recursiveWordPlay(wordArray: string[]) {
    if (!wordArray.length) return;
    playChord(words[0], duration, offset);
    await space();
    return await recursiveWordPlay(wordArray.splice(1));
  }
  return await recursiveWordPlay(words);
}


export { playPhrase };
