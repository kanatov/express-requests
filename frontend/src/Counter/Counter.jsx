import { useState, useEffect } from "react";

const URI_COUNTER = "http://localhost:3100/api/counters";

function Counter() {
  const [counts, setCounts] = useState("no counts");
  const getTime = async () => {
    try {
      const response = await fetch(`${URI_COUNTER}/counter-1`);
      const data = await response.json();
      setCounts(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getTime();
  }, []);
  return (
    <section className="section">
      <h2>Time</h2>
      <pre>{JSON.stringify(counts)}</pre>
      <button onClick={getTime}>Refresh</button>
    </section>
  );
}

export default Counter;
