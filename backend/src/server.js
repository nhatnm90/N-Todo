import express from 'express'
import taskRoute from './routes/tasksRoute.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { protectRoute } from './middlewares/authMiddleware.js'

dotenv.config()

const __dirname = path.resolve()

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: ['http://localhost:5173'] }))
}

// public routes
app.use('/api/auth', authRoute)
app.use('/api/tasks', taskRoute)

// private routes
app.use(protectRoute)
app.use('/api/user', userRoute)

if (process.env.NODE_ENV === 'production') {
  /*
  tạo biến lưu đường dẫn tuyệt đối đến thư mục hiện tại trên server
  - middleware 1: lấy code front end trong thư mục dist của front end
  yêu cầu express lấy file để trả về cho người dùng khi truy cập

  - middleware 2: gửi về trang index.html với bất kì url nào mà người dùng gõ vào trình duyệt

  2 middle ware này chỉ chạy trên env production
  */
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

connectDB().then(
  app.listen(process.env.PORT, () => {
    console.log(`Server start in port ${process.env.PORT}`)
  })
)
