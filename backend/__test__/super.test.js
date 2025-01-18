const supertest = require("supertest");
const { app, exit } = require("../src/index");
const api = supertest(app);
describe("API Test", () => {
  it("/api/counters returns empty object", async () => {
    const { body, statusCode } = await api.get("/api/counters");
    expect(statusCode).toEqual(200);
    expect(body.result).toEqual({});
  });
});

exit();
