const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/Users/User.model')
const { ErrorHandler } = require('../helpers/errors/error')
const UserService = require('../services/UserService')

const jwtSignUser = (user) => {
  return jwt.sign({
    iss: config.authentication.issuer,
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) // Expiry in 1 day
  }, config.authentication.jwtSecret)
}

const USER_NOT_SAVED = 'There was a problem saving the user'
const USER_EXISTS_ERROR = 'This username already exists'
const USER_DOES_NOT_EXIST_ERROR = 'This username does not exist'
const INCORRECT_PASSWORD = 'Password incorrect'

module.exports = {
  async register(req, res, next) {
    const { username, password, first_name, last_name } = req.body

    const user = await UserService.getByUsername(username)

    if (user) {
      try {
        throw new ErrorHandler(403, USER_EXISTS_ERROR, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const newUser = await UserService.create({ username, password, first_name, last_name })

        if (!newUser) throw new ErrorHandler(403, USER_NOT_SAVED, __filename)

        res.status(200).json(newUser)
      } catch (err) {
        next(err)
      }
    }
  },
  async login(req, res, next) {
    const { username, password } = req.body;

    const user = await UserService.getByUsername(username)

    if (!user) {
      try {
        throw new ErrorHandler(403, USER_DOES_NOT_EXIST_ERROR, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
          throw new ErrorHandler(403, INCORRECT_PASSWORD, __filename)
        }

        res.status(200).json({
          token: jwtSignUser(user)
        })
      } catch (err) {
        next(err)
      }
    }
  }
}
