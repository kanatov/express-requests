const PORT = 3100;
const URI = `http://localhost:${PORT}/api`;

async function request(method, url) {
  console.log("\n");
  console.log(`___________________`);
  console.log(`Test:\t\t${method}, ${url}`);

  try {
    const response = await fetch(`${URI}${url}`);
    const data = await response.json();
    console.log(`Status:\t\t${data?.message}`);
    console.log(`Response:\t${JSON.stringify(data?.result)}`);
    return data;
  } catch (error) {
    console.error(`Error in request:\n\t\t${error.message}`);
    return null;
  }
}

async function runTests() {
  try {
    console.log("Running tests...");
    const res = await request("GET", "/counters");
    if (res && JSON.stringify(res.result) === "{}") {
      console.log("+ Passed!");
    } else {
      console.error("- Failed!");
    }
  } catch (error) {
    console.error("Error during tests:", error.message);
  } finally {
    console.log(`\n`);
    console.log(`___________________`);
    console.log("Shutting down server...");
    fetch(`${URI}/exit`, { method: "POST" });
  }
}

setTimeout(() => {
  runTests();
}, 2000);
