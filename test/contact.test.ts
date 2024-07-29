import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contact", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });
  it("should create a contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.coml",
        phone: "01010100101",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.firstName).toBe("test");
    expect(response.body.data.lastName).toBe("test");
  });
});
