import express from 'express'
import multer from 'multer'
import { createPatient } from '../controllers/patientsController'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.match(/\.jpg$/)) {
      return cb(new Error('Only .jpg files are allowed'))
    }
    cb(null, true)
  }
})

router.post('/', upload.single('document_photo'), createPatient)

export default router
