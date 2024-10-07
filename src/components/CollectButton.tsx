import { Button } from "react-bootstrap";
import { useGetNewsByMonth } from "../../hooks";
import { playPhrase } from "../synth";
import { createAsyncLoop } from "../synth/loop";
let loop: any;

export default function CollectButton({
  month,
  year,
  startIndex,
}: {
  month: number;
  year: number;
  startIndex: number;
}) {
  async function handlePlay(arr: string[]) {
    loop = createAsyncLoop(playPhrase, arr, startIndex, 6000, 500);
    loop.start();
  }

  async function handleStop() {
    if (loop) loop.stop();
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
  console.log("dataL ", data);
  return (
    <>
      <Button variant="primary" onClick={() => handlePlay(data.GetNewsByMonth)}>
        Play News
      </Button>
      <Button variant="primary" onClick={() => handleStop()}>
        Stop
      </Button>
    </>
  );
}
