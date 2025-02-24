import * as Tone from "tone";
import {
  synthPitches,
  alphabet,
  frequencyRange,
} from "./alphabetSynth";
import { applyDeviation } from "./helpers";

// // // Instantiate PolySynth, add params
let synth: any = {};
for (let k = 0; k < alphabet.length; k++) {
  synth[alphabet[k]] = new Tone.MembraneSynth({
    volume: -35,
    pitchDecay: 0,
    octaves: 10,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack:0.5,
      decay: 7,
      sustain: 1,
      release: 0,
      decayCurve: "linear",
      attackCurve: "exponential",
      releaseCurve: "linear",
    },
  }).toDestination();

  // synth[alphabet[k]] = new Tone.PluckSynth({
  //   attackNoise: 1,
  //   dampening: 1000,
  //   resonance: 1,
  // }).toDestination();

  // synth[alphabet[k]] = new Tone.MetalSynth({
  //   volume: -20,
  //   envelope: {
  //     attack: 0.001,
  //     decay: 12,
  //     release: 0,
  //     sustain: 0.025,
  //     decayCurve: "linear",
  //     releaseCurve: "linear",
  //   },
  //   harmonicity: 0,
  //   modulationIndex: 32,
  //   resonance: 10,
  //   octaves: 1.5,
  // }).toDestination();

  // synth[alphabet[k]] = new Tone.Synth({
  //   volume: -20,
  //   envelope: {
  //     attack: 0,
  //     decay: 7,
  //     release: 0,
  //     sustain: 0.025,
  //     decayCurve: "linear",
  //     releaseCurve: "exponential",
  //   },
  // }).toDestination();
}
//*** SYNCHRONOUS FUNCTIONS ***//

function getPitch(letter: string) {
  return synthPitches[alphabet.indexOf(letter)];
}

// function getVelocity(letter: string) {
//   console.log("synthVeolocites: ", synthVelocities);
//   return synthVelocities[alphabet.indexOf(letter)];
// }

//*** ASYNCHRONOUS FUNCTIONS ***//

// play a note (letter)
async function playNote(
  synth: any,
  note: number,
  index: number
) {
  const now = Tone.now();
  const randomDeviation = 0;
  // const randomDeviation = Math.random() * (3 - 0) + 0;
  const deviatedNote = applyDeviation(
    frequencyRange[0],
    frequencyRange[1],
    note,
    randomDeviation
  );
  const time = index * 0.05; // will use index to elongate attack time per word
  const velocity = Math.random() * (0.7 - -0.5) + -0.5; // -1 = minVelocity for now
  if (synth) {
    try {
      synth.triggerRelease();
      synth.triggerAttack(deviatedNote, now + time, velocity);
    } catch (err) {
      console.log("error triggering: ", err);
    }
  }
  asyncTimeout(time);
  return;
}

async function recursivePlayChord(wordArr: string[], count: number = 0) {
  if (wordArr.length === 0) {
    return;
  }
  let currentSynth = synth[wordArr[0]];
  let pitch = getPitch(wordArr[0]);
  // let velocity = getVelocity(wordArr[0]);
  await playNote(currentSynth, pitch, count);
  return await recursivePlayChord(wordArr.splice(1), count + 1);
}

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
    await recursivePlayChord(wordArray[0].split(""));
    await space(wordSpaceDuration);
    return await recursivePlayWord(wordArray.splice(1), space);
  }
  return await recursivePlayWord(words, space);
}

export { playPhrase };
