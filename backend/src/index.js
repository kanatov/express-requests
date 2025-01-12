const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

function counter() {
  let x = 0;
  return function count() {
    return x++;
  };
}

const count = counter();

app.get("/api/counter", async (req, res) => {
  const countInner = counter();
  res.json({ message: "ok", result: count() });
});

app.listen(PORT, async () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
