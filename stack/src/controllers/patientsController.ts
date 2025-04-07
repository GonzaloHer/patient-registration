import { Request, Response } from "express";
import { pool } from "../utils/db";
import { patientSchema } from "../validators/patientSchema";

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { full_name, email, phone_country_code, phone_number } = req.body;
  const file = req.file;

  const { error } = patientSchema.validate({
    full_name,
    email,
    phone_country_code,
    phone_number,
  });

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  if (!file) {
    res.status(400).json({ error: "Document photo is required" });
    return;
  }

  try {
    const base64Image = file.buffer.toString("base64");

    const result = await pool.query(
      `INSERT INTO patients (full_name, email, phone_country_code, phone_number, document_photo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [full_name, email, phone_country_code, phone_number, base64Image]
    );

    res
      .status(201)
      .json({ message: "Patient created", patient: result.rows[0] });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
