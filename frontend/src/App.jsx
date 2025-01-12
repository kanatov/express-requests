import { Link } from "react-router";
import { Routes, Route, Outlet } from "react-router";

import Time from "./Time/Time";
import Counter from "./Counter/Counter";
import Counters from "./Counters/Counters";

function Layout() {
  return (
    <>
      <h1>Widgets</h1>
      <header>
        <ul>
          <li>
            <Link to={"/"}>Timer</Link>
          </li>
          <li>
            <Link to={"/counters"}>All counters</Link>
          </li>
          <li>
            <Link to={"/counter"}>Counter</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Time />} />
        <Route path="counters" element={<Counters />} />
        <Route path="counter" element={<Counter />} />
      </Route>
    </Routes>
  );
}

export default App;
