const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { ErrorHandler, handleMongooseError } = require('../helpers/errors/error')
const UserService = require('../services/UserService')
const { handleResponse } = require('../helpers/resources/response')

const jwtSignUser = (user) => jwt.sign({
  iss: config.authentication.issuer,
  sub: user.id,
  iat: new Date().getTime(),
  exp: new Date().setDate(new Date().getDate() + 1) // Expiry in 1 day
}, config.authentication.jwtSecret)

const USER_NOT_SAVED = 'There was a problem saving the user'
const USER_EXISTS_ERROR = 'This username already exists'
const USER_DOES_NOT_EXIST_ERROR = 'This username does not exist'
const INCORRECT_PASSWORD = 'Password incorrect'

module.exports = {
  async register(req, res, next) {
    const {
      username, password, firstName, lastName
    } = req.body

    const user = await UserService.getByUsername(username)

    if (user) {
      try {
        throw new ErrorHandler(403, USER_EXISTS_ERROR, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const newUser = await UserService.create({
          username, password, firstName, lastName
        })

        handleResponse({ user: newUser}, res)
      } catch (err) {
        next(handleMongooseError(err.errors))
      }
    }
  },
  async login(req, res, next) {
    const { username, password } = req.body

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

        const data = {
          token: jwtSignUser(user)
        }

        handleResponse(data, res)
      } catch (err) {
        next(err)
      }
    }
  }
}
