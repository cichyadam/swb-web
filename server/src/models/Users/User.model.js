/* eslint-disable consistent-return */
const mongoose = require('mongoose')

const { Schema } = mongoose
const bcrypt = require('bcrypt')
const config = require('../../config/config')
const { ErrorHandler } = require('../../helpers/errors/error')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  user.updatedAt = Date.now

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(config.authentication.salt_factor, (err, salt) => {
    if (err) return next(err)

    // eslint-disable-next-line no-shadow
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    throw new ErrorHandler(500, err, __filename)
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
