import path from 'path'
import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

import express from 'express'
import cors from 'cors'
import patientsRoutes from './routes/patients'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.send('stack running')
})

app.use('/patients', patientsRoutes)

export default app
