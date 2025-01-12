const express = require("express");
const cors = require("cors");
const counter = require("./tools/counter");
const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

// GET time
app.get("/api/time", async (req, res) => {
  res.json({ message: "ok", result: new Date().toUTCString() });
});

// GET counters
const counters = new Map();
counters.set("counter-1", 0);
counters.set("counter-2", 110);
counters.set("counter-5", null);

app.get("/api/counters", async (req, res) => {
  res.json({ message: "ok", result: Object.fromEntries(counters) });
});
app.get("/api/counters/:id", async (req, res) => {
  const id = req.params.id;
  console.log(counters.has(id));
  if (counters.has(id)) res.json({ message: "ok", result: counters.get(id) });
  else res.status(400).json({ error: `No counters with id: ${id}` });
});

app.listen(PORT, async () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
