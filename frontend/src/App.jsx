import { useState, useEffect } from "react";
import Time from "./Time/Time";
import Counter from "./Counter/Counter";
const URI_TIME = "http://localhost:3100/api/time";

function App() {
  const [counts, setCounts] = useState("no counts");
  const getCounts = async () => {
    try {
      const response = await fetch(URI_TIME);
      const data = await response.json();
      setCounts(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <h1>Widgets</h1>
      <Time />
      <Counter />
    </>
  );
}

export default App;
