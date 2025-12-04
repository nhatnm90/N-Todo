import express from 'express'
import { signIn, signUp, signOut, refreshToken, signInWithExternal } from '../controllers/authController.js'

const router = express.Router()

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'OK nha' })
})
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)
router.post('/refreshtoken', refreshToken)
router.post('/signinwithexternal', signInWithExternal)

export default router
