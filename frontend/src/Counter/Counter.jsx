import { useState } from "react";

const URI = "http://localhost:3100/api/counters";

function Counter() {
  const [counts, setCounts] = useState(null);
  const [inputID, setInputID] = useState("");
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
  async function refresh(id = inputID) {
    if (!id) {
      setUIState("empty");
      return;
    }
    try {
      setDisplayID(id);
      const response = await fetch(`${URI}/${id}`);
      const data = await response.json();
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
      setInputID(e.target.value);
      return;
    }
    const newVal = e.target.value.trim().slice(0, 12);
    if (new RegExp("^[A-Za-z0-9-]+$", "g").test(newVal)) setInputID(newVal);
  }

  async function decrease(e) {
    if (counts - 1 < 0) return;
    try {
      const response = await fetch(`${URI}/${displayID}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: displayID, val: counts - 1 }),
      });
      const data = await response.json();
      if (!isNaN(parseInt(data?.result))) refresh(displayID);
      else setUIState("create-error");
    } catch (e) {
      console.error(e);
    }
  }
  async function increase(e) {
    if (counts + 1 > 10) return;
    try {
      const response = await fetch(`${URI}/${displayID}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: displayID, val: counts + 1 }),
      });
      const data = await response.json();
      if (!isNaN(parseInt(data?.result))) refresh(displayID);
      else setUIState("create-error");
    } catch (e) {
      console.error(e);
    }
  }
  async function deleteCounter(e) {
    try {
      fetch(`${URI}/${displayID}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        refresh(displayID);
      });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <section className="section">
      <h2>Counter</h2>
      <p>
        ID: <input onChange={inputHandler} value={inputID} />
      </p>
      <button onClick={() => refresh()}>Check</button>
      {UIState === "valid" && (
        <>
          <pre>{`{ "${displayID}": ${counts} }`}</pre>
          <button onClick={decrease}>–</button>
          <button onClick={increase}>+</button>
          <br />
          <button onClick={deleteCounter}>delete</button>
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
