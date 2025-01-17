import { useState, useEffect } from "react";

const URI_TIME = "http://localhost:3100/api/time";

function Time() {
  const [counts, setCounts] = useState("no counts");
  const refresh = async () => {
    try {
      const response = await fetch(URI_TIME);
      const data = await response.json();
      setCounts(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  return (
    <section className="section">
      <h2>Time</h2>
      <pre>{JSON.stringify(counts)}</pre>
      <button onClick={refresh}>Refresh</button>
    </section>
  );
}

export default Time;
