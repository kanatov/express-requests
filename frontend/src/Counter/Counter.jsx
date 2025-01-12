import { useState, useEffect } from "react";

const URI = "http://localhost:3100/api/counters";

function Counter() {
  const [counts, setCounts] = useState(null);
  const refresh = async () => {
    try {
      const response = await fetch(`${URI}/${inputVal}`);
      const data = await response.json();
      if (data?.result) setCounts(data.result);
      else setCounts(`No counter with ID: ${inputVal}`);
    } catch (e) {
      console.error(e);
    }
  };
  const [inputVal, setInputVal] = useState("");
  function inputHandler(e) {
    if (
      !e.target.value ||
      new RegExp("^[A-Za-z0-9-]+$", "g").test(e.target.value)
    )
      setInputVal(e.target.value);
  }
  return (
    <section className="section">
      <h2>Counter</h2>
      <p>
        Counter id: <input onChange={inputHandler} value={inputVal} />
      </p>
      <button onClick={refresh}>Get counter</button>
      {counts !== null && <pre>{counts}</pre>}
    </section>
  );
}

export default Counter;
