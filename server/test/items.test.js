import request from "supertest";
import { expect } from "chai";
import app from "../src/server.js";

describe("Collectify API", () => {
  it("root serves the app or the API message", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);

    const htmlDoctype =
      typeof res.text === "string" &&
      res.text.toLowerCase().includes("<!doctype html");
    const apiMessage =
      typeof res.text === "string" &&
      res.text.includes("Collectify API is running");

    expect(htmlDoctype || apiMessage).to.equal(true);
  });
});
