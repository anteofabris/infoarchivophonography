import { Button, Form } from "react-bootstrap";
import { useGetNewsByMonth } from "../../hooks";
import { playPhrase } from "../synth";
import { createAsyncLoop } from "../synth/loop";
import { useState } from "react";
let loop: any;

export default function CollectButton({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  async function handlePlay(arr: string[]) {
    loop = createAsyncLoop(playPhrase, arr, startIndex, 12000, 1000);
    loop.start();
    setPlaying(true);
  }

  async function handleStop() {
    console.log("stop: ", loop);
    if (loop) loop.stop();
    setPlaying(false);
  }

  const [getNews, { called, data, loading, error }] = useGetNewsByMonth(
    month,
    year
  );
  if (called && loading)
    return (
      <Button variant="primary" disabled>
        loading...
      </Button>
    );
  if (error)
    return (
      <Button variant="primary" disabled>
        error: {error.message}
      </Button>
    );
  if (!called)
    return (
      <Button variant="primary" onClick={() => getNews()}>
        Collect News
      </Button>
    );
  const phrases = data.GetNewsByMonth.phrases;
  const startingIndexes = data.GetNewsByMonth.startingIndexes;
  return (
    <>
      <Form.Select
        onChange={(e) => setStartIndex(Number(e.target.value))}
        defaultValue={year}
      >
        {startingIndexes.map((index: any) => (
          <option key={index[0]} value={index[1]}>
            {index[0]}
          </option>
        ))}
      </Form.Select>
      <Button
        variant="primary"
        onClick={() => handlePlay(phrases)}
        disabled={playing}
      >
        Play News
      </Button>
      <Button
        variant="primary"
        onClick={() => handleStop()}
        disabled={!playing}
      >
        Stop
      </Button>
    </>
  );
}
