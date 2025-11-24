import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protectRoute = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    const accessToken = authHeader?.split(' ')[1] // get Bearer token

    if (!accessToken) {
      return res.status(401).json({ message: 'Token is not existed' })
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRECT, async (err, decodedUser) => {
      if (err) {
        console.error('Token is incorrect: ', err)
        return res.status(403).json({ message: 'Token is expired' })
      }
      const existedUser = await User.findById(decodedUser.userId).select('-hashedPassword')
      if (!existedUser) {
        return res.status(404).json({ message: 'User is not existed' })
      }

      req.user = existedUser
      next()
    })
  } catch (error) {
    console.log('Error when authorizing user in Middleware: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
