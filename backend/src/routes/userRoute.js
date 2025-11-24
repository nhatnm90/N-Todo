import express from 'express'
import { authMe } from '../controllers/userController.js'

const router = express.Router()

router.post('/me', authMe)

export default router
