import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  it("shoud reject when the request body is empty", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      name: "",
      password: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
  });
  it("shoud register new user ", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      name: "test",
      password: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should be able to get user ", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
  it("should be invalid to  get data  user ", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "salah");
    logger.debug(response.body);
    expect(response.status).toBe(401);
  });
});

describe("Delete /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should be able to delete user", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
  });
  it("should be invalid to delete user", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "salah");
    logger.debug(response.body);
    expect(response.status).toBe(401);
  });
});
