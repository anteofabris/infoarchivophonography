import { useState } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
import CollectButton from "./components/CollectButton";

const today = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: today.getFullYear() - 1850 },
  (_, i) => i + 1851
);

function App() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  // const [startIndex, setStartIndex] = useState(0);
  const [sentence, setSentence] = useState(null);

  return (
    <>
      {sentence === null && <h1>Infoarchivophonography</h1>}
      {/* <h2>"When reading the news isn't enough"</h2> */}
      {sentence !== null && (
        <h1>
          <i>{(sentence as any).split(" ").sort().join(" ")}</i>
        </h1>
      )}

      <div className="card">
        <Form.Select
          onChange={(e) => setMonth(Number(e.target.value))}
          defaultValue={month}
        >
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          onChange={(e) => setYear(Number(e.target.value))}
          defaultValue={year}
        >
          {years.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </Form.Select>
      </div>
      <div>
        <CollectButton month={month} year={year} setSentence={setSentence} />
      </div>
    </>
  );
}

export default App;
