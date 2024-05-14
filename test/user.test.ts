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
