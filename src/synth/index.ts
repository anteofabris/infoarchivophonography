import * as Tone from "tone";
import { synthPitches, alphabet } from "./alphabetSynth";
import { posix } from "node:path/posix";

// // // Instantiate PolySynth, add params
// const synth = new Tone.PolySynth(Tone.Synth, {
// volume: -20,
// envelope: {
//   attack: 0,
//   decay: 7,
//   release: 7,
//   decayCurve: "exponential",
//   releaseCurve: "exponential",
// },
// }).toDestination();
let synth: any = {};
for (let k = 0; k < alphabet.length; k++) {
  synth[alphabet[k]] = new Tone.Synth({
    volume: -20,
    envelope: {
      attack: 0,
      decay: 7,
      release: 0,
      sustain: 0.025,
      decayCurve: "linear",
      releaseCurve: "exponential",
    },
  }).toDestination();
}
console.log("SYNTH: ", synth);
//*** SYNCHRONOUS FUNCTIONS ***//

function getPitch(letter: string) {
  return synthPitches[alphabet.indexOf(letter)];
}

// play a note (letter)
async function playNote(synth: any, note: number, index: number) {
  const time = index * 0.01; // will use index to elongate attack time per word
  const velocity = Math.random() * (0.7 - -0.5) + -0.5; // -1 = minVelocity for now
  if (synth) {
    synth.triggerRelease();
    synth.triggerAttack(note, undefined, velocity);
  }
  asyncTimeout(time);
  return;
}

// play a chord (word)
// function playChord(word: string) {
//   // playNotes(getPitches(word));
//   for (let i = 0; i < word.length; i++) {
//     // get the synth
//     let currentSynth = synth[word[i]];
//     // get the pitch, play it
//     let pitch = getPitch(word[i]);
//     playNote(currentSynth, pitch, i);
//   }
// }

async function recursivePlayChord(wordArr: string[], count: number = 0) {
  if (wordArr.length === 0) {
    return;
  }
  let currentSynth = synth[wordArr[0]];
  let pitch = getPitch(wordArr[0]);
  // await new Promise((resolve) => {
  //   playNote(currentSynth, pitch, count);
  //   resolve;
  // }); // Delay between iterations
  await playNote(currentSynth, pitch, count);
  return await recursivePlayChord(wordArr.splice(1), count + 1);
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
    await recursivePlayChord(wordArray[0].split(""));
    await space(wordSpaceDuration);
    return await recursivePlayWord(wordArray.splice(1), space);
  }
  return await recursivePlayWord(words, space);
}

export { playPhrase };
