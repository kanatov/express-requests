import { useState } from "react";

const URI = "http://localhost:3100/api/counters";

function Counter() {
  const [counts, setCounts] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [displayID, setDisplayID] = useState("");
  const [UIState, setUIState] = useState("empty");

  async function create() {
    try {
      const response = await fetch(URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: displayID }),
      });
      const data = await response.json();
      if (data?.result) refresh();
      else setUIState("create-error");
    } catch (e) {
      console.error(e);
    }
  }
  async function refresh() {
    if (!inputVal) {
      setUIState("empty");
      return;
    }
    try {
      const response = await fetch(`${URI}/${inputVal}`);
      const data = await response.json();
      setDisplayID(inputVal);
      if (!isNaN(parseInt(data?.result))) {
        setCounts(data.result);
        setUIState("valid");
      } else {
        setCounts(null);
        setUIState("invalid");
      }
    } catch (e) {
      console.error(e);
    }
  }

  function inputHandler(e) {
    if (!e.target.value) {
      setInputVal(e.target.value);
      return;
    }
    const newVal = e.target.value.trim().slice(0, 12);
    if (new RegExp("^[A-Za-z0-9-]+$", "g").test(newVal)) setInputVal(newVal);
  }

  function decrease(e) {}
  function increase(e) {}
  return (
    <section className="section">
      <h2>Counter</h2>
      <p>
        ID: <input onChange={inputHandler} value={inputVal} />
      </p>
      <button onClick={refresh}>Check</button>
      {UIState === "valid" && (
        <>
          <pre>{`{ "${displayID}": ${counts} }`}</pre>
          <button onClick={decrease}>–</button>
          <button onClick={increase}>+</button>
        </>
      )}
      {UIState === "empty" && <p>Enter counter ID</p>}
      {UIState === "invalid" && (
        <>
          <p>No such counter with ID:</p> <pre>"{displayID}"</pre>
          <button onClick={create}>Create</button>
        </>
      )}
    </section>
  );
}

export default Counter;
