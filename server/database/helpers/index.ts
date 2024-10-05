export function extractAndSort(docs: Array<any>) {
  // filter all sentences into an array, sort them
  return docs
    .map((doc) => doc.lead_paragraph)
    .join()
    .split(". ")
    .sort();
}

export function deepExtractAndSort(docs: Array<any>) {
  // filter all sentences into an array, sort them
  // clean all commas, apostrophes and quotes
  let operation = docs.map((doc) => doc.lead_paragraph);
  operation = operation
    .join()
    .replace(/["'’‘(),”“]/g, "")
    .split(/[!.?:;](?=\s)/g);
  operation = operation.map((s) => s.trim());
  operation = operation.sort();
  return operation;
}
