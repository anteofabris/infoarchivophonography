export function extractAndSort(docs: Array<any>) {
  // filter all sentences into an array, sort them
  return docs.map((doc) => doc.lead_paragraph).join().split(". ").sort();
}
