import mongoose from 'mongoose'

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true
    },
    expriredAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// index dùng để tự động xóa refreshToken khi expired
userSessionSchema.index({ expriredAt: 1 }, { expireAfterSeconds: 0 })

const UserSession = mongoose.model('UserSession', userSessionSchema)
export default UserSession
