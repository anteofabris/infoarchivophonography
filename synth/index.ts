import * as Tone from "Tone";
import { synthPitches, alphabet } from "./alphabet";

// Instantiate PolySynth
const synth = new Tone.PolySynth().toDestination();

// if preferred, set the attributes across all the voices using 'set'
// synth.set({ detune: -1200 });

//*** ALL FUNCTIONS ARE ASYNC PROMISES TO ACCOUNT FOR TIMING ***//

// play a note (letter)
async function playNote() {
  return null;
}

// play a chord (word)
async function playChord() {
  return null;
}

// play a pause (space, sentence end)
async function playPause() {
  return null;
}

// play a phrase of chords (sentence)
async function playPhrase() {
  return null;
}

export { playNote, playChord, playPause, playPhrase };
