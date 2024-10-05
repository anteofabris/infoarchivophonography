export function extractAndSort(docs: Array<any>) {
  // filter all sentences into an array, sort them
  return docs
    .map((doc) => doc.lead_paragraph)
    .join()
    .split(". ")
    .sort();
}

export function deepExtractAndSort(docs: Array<any>) {
  let operation = docs.map((doc) => doc.lead_paragraph); // extract all first paragraphs
  operation = operation
    .join()
    .replace(/["'’‘(),”“]/g, "")
    .split(/[!.?:;](?=\s)/g); // clean all commas, apostrophes and quotes
  operation = operation.map((s) => s.trim().toLowerCase()); // trim whitespace and make lowercase
  operation = operation.filter((s) => s.length > 5); // remove strings that would be musically too uninteresting
  operation = operation.sort(); // sort the strings
  return operation;
}
