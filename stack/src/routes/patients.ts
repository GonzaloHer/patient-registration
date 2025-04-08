import express from "express";
import multer from "multer";
import { pool } from "../utils/db"
import { createPatient } from "../controllers/patientsController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.match(/\.jpg$/)) {
      return cb(new Error("Only .jpg files are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients ORDER BY id DESC")
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", upload.single("document_photo"), createPatient);

export default router;
