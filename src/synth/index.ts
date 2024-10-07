import * as Tone from "tone";
import { synthPitches, alphabet } from "./alphabetSynth";
import { posix } from "node:path/posix";

// // Instantiate PolySynth
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
synth.set({
  envelope: {
    attack: 0,
    decay: 1,
    release: 0.2,
  },
});
// if preferred, set the attributes across all the voices using 'set'
// synth.set({ detune: -1200 });

//*** SYNCHRONOUS FUNCTIONS ***//

// play a note (letter)
function playNote(
  letter: string,
  wordSpaceDuration: number,
  letterSpaceDuration: number
) {
  synth.triggerAttackRelease(synthPitches[alphabet.indexOf(letter)], 1);
}

function getPitches(word: string) {
  return word.split("").map((l) => synthPitches[alphabet.indexOf(l)]);
}

function playNotes(chord: number[]) {
  synth.triggerAttackRelease(chord, 1);
}

function durationUnit(num: number) {
  return num;
}

function incrementationUnit(num: number) {
  return num;
}
// play a chord (word)
function playChord(word: string) {
  playNotes(getPitches(word));
}

//*** ASYNCHRONOUS FUNCTIONS ***//

// play a pause (space, sentence end)
const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// play a phrase of chords (sentence)
async function playPhrase(sentence: string, wordSpaceDuration: number) {
  console.log("playPhrase: ", sentence);
  // split sentence into words
  const words = sentence.split(" ");
  const space = async (dur: number) => {
    const delay = Math.random() * (dur - 0) + 0; // 0 = minDelay for now
    await asyncTimeout(delay);
  };
  // recursive async function to play words with spaces in between
  async function recursivePlayWord(wordArray: string[], space: any) {
    if (!wordArray.length) return;
    playChord(wordArray[0]);
    await space(wordSpaceDuration);
    return await recursivePlayWord(wordArray.splice(1), space);
  }
  return await recursivePlayWord(words, space);
}

export { playPhrase };
