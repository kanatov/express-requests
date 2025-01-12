import { useState, useEffect } from "react";

const URI = "http://localhost:3100/api/counter";

function App() {
  const [counts, setCounts] = useState("no counts");
  const getCounts = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      setCounts(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <h1>Counters</h1>
      <p>Count: {JSON.stringify(counts)}</p>
      <button onClick={getCounts}>Count</button>
    </>
  );
}

export default App;
