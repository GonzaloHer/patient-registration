import { Request, Response } from "express";
import { pool } from "../utils/db";
import { patientSchema } from "../validators/patientSchema";
import { emailQueue } from "../queues/emailQueue";
import { PG_ERROR_MESSAGES } from "../constants/pgErrorMessages";

export const createPatient = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const validationError = validateRequest(req);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const patient = await savePatientToDatabase(req);
    await sendConfirmationEmail(patient);

    res.status(201).json({
      message: "Patient created",
      patient,
    });
  } catch (error: any) {
    handleDatabaseError(error, res);
  }
};

function validateRequest(req: Request): string | null {
  const { full_name, email, phone_country_code, phone_number } = req.body;
  const file = req.file;

  const { error } = patientSchema.validate({
    full_name,
    email,
    phone_country_code,
    phone_number,
  });

  if (error) return error.details[0].message;
  if (!file) return "Document photo is required";

  return null;
}

async function savePatientToDatabase(req: Request) {
  const { full_name, email, phone_country_code, phone_number } = req.body;
  const file = req.file!;

  const base64Image = file.buffer.toString("base64");

  const query = `
    INSERT INTO patients (full_name, email, phone_country_code, phone_number, document_photo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const values = [
    full_name,
    email,
    phone_country_code,
    phone_number,
    base64Image,
  ];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function sendConfirmationEmail(patient: any) {
  await emailQueue.add({
    to: patient.email,
    name: patient.full_name,
    subject: "Thanks for registering!",
    text: `Hi ${patient.full_name}, your registration is confirmed.`,
  });
}

function handleDatabaseError(error: any, res: Response) {
  const pgError = PG_ERROR_MESSAGES[error.code];

  if (pgError) {
    return res.status(pgError.status).json({ error: pgError.message });
  }

  return res.status(500).json({ error: "Internal server error" });
}
