import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import patientsRoutes from './routes/patients'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

//This is testing endpoint
app.get('/health', (_req, res) => {
  res.send('stack running')
})

app.use('/patients', patientsRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
