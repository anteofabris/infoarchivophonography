import * as Tone from "tone";
import { synthPitches, alphabet } from "./alphabetSynth";

// // Instantiate PolySynth
const synth = new Tone.PolySynth().toDestination();
const now = Tone.now();
// if preferred, set the attributes across all the voices using 'set'
// synth.set({ detune: -1200 });

//*** SYNCHRONOUS FUNCTIONS ***//

// play a note (letter)
function playNote(
  letter: string,
  wordSpaceDuration: number,
  letterSpaceDuration: number
) {
  synth.triggerAttackRelease(synthPitches[alphabet.indexOf(letter)], 1, now);
}

function getPitches(word: string) {
  return word.split("").map((l) => synthPitches[alphabet.indexOf(l)]);
}

function playNotes(chord: number[]) {
  synth.triggerAttackRelease(chord, "8n", now);
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
async function playPhrase(
  sentence: string,
  sentenceSpaceDuration: number,
  wordSpaceDuration: number,
  letterSpaceDuration: number
) {
  console.log("playPhrase: ", sentence);
  // split sentence into words
  const words = sentence.split(" ");
  const space = async () => await asyncTimeout(wordSpaceDuration);
  // recursive async function to play words with spaces in between
  async function recursiveWordPlay(wordArray: string[], space: any) {
    if (!wordArray.length) return;
    playChord(wordArray[0]);
    await space();
    return await recursiveWordPlay(wordArray.splice(1), space);
  }
  return await recursiveWordPlay(words, space);
}

export { playPhrase };
