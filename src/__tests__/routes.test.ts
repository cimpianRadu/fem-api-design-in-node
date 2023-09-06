import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should send bacck a welcome message", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello World Sir");
  });
});
