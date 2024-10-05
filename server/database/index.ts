import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractAndSort } from "./helpers";

export async function dbGetNewsByMonth(month: number, year: number) {
  // month is 0-indexed, so we will add 1 here
  // api call for data
  let news;
  try {
    news = await axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${
      month + 1
    }.json?api-key=${process.env.VITE_NYT_API_KEY}
  `);
  } catch (err) {
    console.log("error getting news: ", err, process.env.VITE_NYT_API_KEY);
  }
  const alphabeticalOrder = extractAndSort(news.data.response.docs);
  const writeObj = { sorted: alphabeticalOrder };
  const filepath = path.join(process.cwd(), "/logs/sortedNews.json");
  fs.writeFile(filepath, JSON.stringify(writeObj), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  console.log("docs length: ", news.data.response.docs.length);
  return [{ data: "Hello, world!" }];
}
