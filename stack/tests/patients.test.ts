import request from "supertest";
import app from "../src/app";
import path from "path";
import { patientSchema } from "../src/validators/patientSchema";

const dummyImagePath = path.resolve(__dirname, "assets", "dummy.jpg");

describe("POST /patients", () => {
  it("should return 400 if full_name is missing", async () => {
    const res = await request(app)
      .post("/patients")
      .field("email", "test@gmail.com")
      .field("phone_country_code", "+598")
      .field("phone_number", "12345678");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return 400 if email is not @gmail.com", async () => {
    const res = await request(app)
      .post("/patients")
      .field("full_name", "Test User")
      .field("email", "test@hotmail.com")
      .field("phone_country_code", "+598")
      .field("phone_number", "12345678")
      .attach("document_photo", dummyImagePath);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Email must be a valid @gmail.com address");
  });

  it("should pass validation with valid data", () => {
    const data = {
      full_name: "Juan Perez",
      email: "juan_test@gmail.com",
      phone_country_code: "+598",
      phone_number: "12345678",
    };

    const result = patientSchema.validate(data);
    expect(result.error).toBeUndefined();
  });
});
