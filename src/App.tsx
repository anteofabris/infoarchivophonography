import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const { loading, error, data } = useQuery(gql`
    query ExampleQuery {
      books {
        title
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const books = data.books;
  console.log("books: ", books);

  return (
    <>
      <h1>ViteJS Front End, Apollo/Graphql Back End</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
