import { useState, useEffect } from "react";

const URI = "http://localhost:3100/api/counters";

function Counter() {
  const [counters, setCounters] = useState("no counters");
  const refresh = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      setCounters(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  return (
    <section className="section">
      <h2>All counters</h2>
      <button onClick={refresh}>Refresh</button>
      <pre>{JSON.stringify(counters, undefined, 2)}</pre>
    </section>
  );
}

export default Counter;
