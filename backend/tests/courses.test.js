import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

// NOTE: requires a running MongoDB instance (set MONGO_URI before running).
describe("Courses API", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/courses returns a paginated list", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
