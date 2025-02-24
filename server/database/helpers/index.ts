import { alphabet } from "../../../src/synth/alphabetSynth.ts";
const abbreviatedMonths = [
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "sept",
  "oct",
  "nov",
  "dec",
];

const knownAbbreviations = [
  ...abbreviatedMonths,
  'rev',
  'dr',
  'mr',
  'ms',
  'mrs',
  'phd',
  'mm',
  'ma',
  'pres.'

]
export function extractAndSort(docs: Array<any>) {
  // filter all sentences into an array, sort them
  return docs
    .map((doc) => doc.lead_paragraph)
    .join()
    .split(". ")
    .sort();
}

export function deepExtractAndSort(docs: Array<any>) {
  let operation: any = docs.map((doc) => doc.lead_paragraph); // extract all first paragraphs
    operation =  operation.join()
    // operation.join()
    .replace(/["'’‘()-,”“]/g, "") // clean all commas, apostrophes and quotes
    .split(/[!.?](?=\s)/g) // split along punctuation followed by space
  operation = operation.map((s) => s.trim().toLowerCase()); // trim whitespace and make lowercase
  operation = operation.map((s) => s.split(/[!.?:;]/g)).flat(); // split along punctuation without a trailing space
  operation = operation.filter((s) => s.length > 5); // remove strings that would be musically too uninteresting
  operation = operation.sort(); // sort the strings
  return operation; 
}
export function allWordsAlphabetized(docs: Array<any>) {
  let operation: any = docs.map((doc) => doc.lead_paragraph); // extract all first paragraphs
    operation =  operation.join()
    // operation.join()
    .replace(/["'’‘()-,”“/!.?;]/g, "") // clean all punctuation, quotes and spaces
    // .split(/[!.?](?=\s)/g) // split along punctuation followed by space
    .split(" ") // split along spaces
  operation = operation.map((s) => s.trim().toLowerCase()); // trim whitespace and make lowercase
  // operation = operation.map((s) => s.split(/[!.?:;]/g)).flat(); // split along punctuation without a trailing space
  // operation = operation.filter((s) => s.length > 2 || s[0] === 'a' || s[0] === 'i'); // keep if you want to hear the letter "a" for like 50 minutes lol
  operation = operation.filter((s) => s.length > 2); // keep if you want to hear the letter "a" for like 50 minutes lol
  operation = operation.sort(); // sort the strings
  return operation; 
}

export function extractSortFirstTwoSentences(docs: Array<any>) {
  // workaround function for extracting at most 2 sentences and at least one sentence, as long as there is only one abbreviation in the sentence
  let operation = docs.map((doc) => doc.lead_paragraph); // extract all first paragraphs
  // extract all first sentences: ". " with the exception if the ending word was found in abbreviatedMonths
}

export function headlineSortMostLetters(docs: Array<any>) {

}

// gets the indexes at which each new letter begins
export function getLetterIndexes(sentences: string[]) {
  let result: any = [];
  let presentLetters = {};
  let alph = alphabet;
  for (let i = 0; i < sentences.length; i++) {
    if (!presentLetters[sentences[i][0]]) presentLetters[sentences[i][0]] = i;
  }
  for (let i = 0; i < alph.length; i++) {
    if (presentLetters[alph[i]])
      // result.push({ [alph[i]]: presentLetters[alph[i]] });
      result.push([alph[i], presentLetters[alph[i]]]);
  }
  return result;
}
