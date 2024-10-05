import { Button } from "react-bootstrap";
import { useGetNewsByMonth } from "../../hooks";

export default function CollectButton({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
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
  return <Button variant="primary">Play News</Button>;
}
