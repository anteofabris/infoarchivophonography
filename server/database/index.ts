import { deepExtractAndSort } from "./helpers";
import testNews from "../../logs/newsResponse.json";

export async function dbGetNewsByMonth(month: number, year: number) {
  // month is 0-indexed, so we will add 1 here
  // api call for data
  let news = testNews;
  // try {
  //   news = await axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${
  //     month + 1
  //   }.json?api-key=${process.env.VITE_NYT_API_KEY}
  // `);
  // } catch (err) {
  //   console.log("error getting news: ", err, process.env.VITE_NYT_API_KEY);
  // }
  const alphabeticalOrder = deepExtractAndSort(testNews.response.docs);
  // const writeObj = { sorted: alphabeticalOrder };
  // const filepath = path.join(process.cwd(), "/logs/sortedNews.json");
  // const filepath2 = path.join(process.cwd(), "/logs/newsResponse.json");
  // fs.writeFile(filepath, JSON.stringify(writeObj), function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("The sorted file was saved!");
  // });
  // fs.writeFile(filepath2, JSON.stringify(news.data), function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("The data was saved!");
  // });
  return alphabeticalOrder;
}

export async function dbPlayData(data: string[], startingIndex: number) {
  // start a loop with a stop method
  // let loop = createAsyncLoop(playPhrase, data, startingIndex, 1000, 2000);
  // loop.start();
  // // return the stop method
  // return loop;
}

export async function dbStop(loop: any) {
  return loop.stop();
}
