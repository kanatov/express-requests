process.title = "backend";
const express = require("express");
const cors = require("cors");
const counterNameValidation = require("./tools/counterNameValidation");
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

app.get("/api/counters", async (req, res) => {
  res.json({ message: "ok", result: Object.fromEntries(counters) });
});

// GET counter ID
app.get("/api/counters/:id", async (req, res) => {
  const id = req.params.id;
  if (counterNameValidation(id) && counters.has(id))
    res.json({ message: "ok", result: counters.get(id) });
  else res.status(400).json({ error: `No counters with ID: ${id}` });
});

// POST new counter
app.post("/api/counters", async (req, res) => {
  const { id } = req.body;
  if (!counterNameValidation(id)) {
    res.status(400).json({ error: `Invalid ID name: ${id}` });
    return;
  }
  if (counters.has(id)) {
    res.status(400).json({ error: `Existing counter with ID: ${id}` });
    return;
  }
  counters.set(id, 1);
  res.json({ message: "ok", result: id });
});

// PUT update to counter
app.put("/api/counters/:id", async (req, res) => {
  const { id } = req.params;
  const { val } = req.body;
  if (!counterNameValidation(id)) {
    res.status(400).json({ error: `Invalid ID name: ${id}` });
    return;
  }
  if (!counters.has(id)) {
    res.status(400).json({ error: `No counters with ID: ${id}` });
    return;
  }
  if (val < 0 || val > 10) {
    res.status(400).json({ error: `Value out of range: ${val}` });
    return;
  }
  counters.set(id, val);
  res.json({ message: "ok", result: val });
});

app.post("/api/exit", async (req, res) => {
  res.send("Bye!");
  server.close(() => {
    console.log("Server terminated.\n");
    process.exit(0);
  });
});

// Bad request handling
app.all("*", function (req, res) {
  res.status(500).json({ error: "Bad request" });
});

const server = app.listen(PORT, async () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server terminated.\n");
    process.exit(0);
  });
});
