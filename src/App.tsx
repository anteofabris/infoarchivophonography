import * as Tone from "tone";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useGetNewsByMonth } from "../hooks/index";
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
  const [startIndex, setStartIndex] = useState(0);
  console.log("nubmers:", month, year);

  return (
    <>
      <h1>Infoarchivophonography</h1>
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
        <CollectButton month={month} year={year} startIndex={startIndex} />
      </div>
    </>
  );
}

export default App;
