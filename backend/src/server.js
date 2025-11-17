import express from 'express'
import taskRouter from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }))

app.use('/api/tasks', taskRouter)

connectDB().then(
  app.listen(process.env.PORT, () => {
    console.log(`Server start in port ${process.env.PORT}`)
  })
)
