const supertest = require("supertest");
const { app, exit } = require("../src/index");
const api = supertest(app);

const MOCKED = {
  id: "alpha",
  val: 5,
  id2: "delta",
  wrong: "wrong",
  "wrong-symbols": "wrong,-=!",
};

describe("API Test", () => {
  describe("\nExpected requests", () => {
    it("GET /api/time\n\treturns current time in UTC format", async () => {
      const { body, statusCode } = await api.get("/api/time");
      expect(statusCode).toEqual(200);
      expect(body.result).toEqual(new Date().toUTCString());
    });
    it("GET /api/counters\n\treturns empty object", async () => {
      const { body, statusCode } = await api.get("/api/counters");
      expect(statusCode).toEqual(200);
      expect(body.result).toEqual({});
    });
    it(`POST /api/counters\n\tcreates a new counter '${MOCKED.id}'`, async () => {
      const { body, statusCode } = await api
        .post("/api/counters")
        .set("Content-Type", "application/json")
        .send({ id: MOCKED.id });
      expect(statusCode).toEqual(201);
      expect(body.result).toEqual(MOCKED.id);
    });
    it(`POST /api/counters\n\tcreates a new counter '${MOCKED.id2}'`, async () => {
      const { body, statusCode } = await api
        .post("/api/counters")
        .set("Content-Type", "application/json")
        .send({ id: MOCKED.id2 });
      expect(statusCode).toEqual(201);
      expect(body.result).toEqual(MOCKED.id2);
    });
    it(`GET /api/counters/:id\n\treturns newly created counter '${MOCKED.id}'`, async () => {
      const { body, statusCode } = await api.get(`/api/counters/${MOCKED.id}`);
      expect(statusCode).toEqual(200);
    });
    it("GET /api/counters/:id\n\tnewly created counter set to 1", async () => {
      const { body, statusCode } = await api.get(`/api/counters/${MOCKED.id}`);
      expect(statusCode).toEqual(200);
      expect(body.result).toEqual(1);
    });
    it(`PUT /api/counters/:id\n\tupdating the counter with a new value ${MOCKED.val}`, async () => {
      const { body, statusCode } = await api
        .put(`/api/counters/${MOCKED.id}`)
        .set("Content-Type", "application/json")
        .send({ id: MOCKED.id, val: MOCKED.val });
      expect(statusCode).toEqual(202);
      expect(body.result).toEqual(MOCKED.val);
    });
    it(`DELETE /api/counters/:id\n\tdeleting counter '${MOCKED.id}'`, async () => {
      const { body, statusCode } = await api
        .delete(`/api/counters/${MOCKED.id}`)
        .set("Content-Type", "application/json");
      expect(statusCode).toEqual(202);
      expect(body.result).toEqual(MOCKED.id);
    });
    it(`GET /api/counters\n\treturns only '${MOCKED.id2}'`, async () => {
      const { body, statusCode } = await api.get("/api/counters");
      expect(statusCode).toEqual(200);
      expect(body.result).toEqual({ [MOCKED.id2]: 1 });
    });
  });

  describe("\nError handling", () => {
    it(`GET /api/${MOCKED.wrong}\n\treturns 'Bad request' error`, async () => {
      const { body, statusCode } = await api.get(`/api/${MOCKED.wrong}`);
      expect(statusCode).toEqual(500);
      expect(body.error).toEqual("Bad request");
    });
    it(`GET /api/counters/${MOCKED["wrong-symbols"]}\n\treturns 'No counters with ID: ${MOCKED["wrong-symbols"]}' error`, async () => {
      const { body, statusCode } = await api.get(
        `/api/counters/${MOCKED["wrong-symbols"]}`
      );
      expect(statusCode).toEqual(404);
      expect(body.error).toEqual(
        `No counters with ID: ${MOCKED["wrong-symbols"]}`
      );
    });
    it(`POST /api/counters\n\tnew counter with a name '${MOCKED["wrong-symbols"]}' returns an error 'Invalid ID name: ${MOCKED["wrong-symbols"]}'`, async () => {
      const { body, statusCode } = await api
        .post("/api/counters")
        .set("Content-Type", "application/json")
        .send({ id: MOCKED["wrong-symbols"] });
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual(`Invalid ID name: ${MOCKED["wrong-symbols"]}`);
    });
    it(`POST /api/counters\n\tnew counter with existing name '${MOCKED.id2}' returns an error 'Existing counter with ID: ${MOCKED.id2}'`, async () => {
      const { body, statusCode } = await api
        .post("/api/counters")
        .set("Content-Type", "application/json")
        .send({ id: MOCKED.id2 });
      expect(statusCode).toEqual(409);
      expect(body.error).toEqual(`Existing counter with ID: ${MOCKED.id2}`);
    });
  });
});
