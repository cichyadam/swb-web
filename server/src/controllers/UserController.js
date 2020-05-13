const jwt = require('jsonwebtoken')
const { roles, authentication } = require('../config/config')
const { ErrorHandler, handleMongooseError } = require('../helpers/errors/error')
const Permissions = require('../features/Permissions')
const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { TUser } = require('../helpers/transforms/transforms')
const { UserCriterion, Criteria } = require('../helpers/criterions/criterions')
const { sculpt } = require('../helpers/resources/interface')
const { isIdValidObjectId } = require('../helpers/utilities/utilities')

const jwtSignUser = (user) => jwt.sign({
  iss: authentication.issuer,
  sub: user.id,
  iat: new Date().getTime(),
  exp: new Date().setDate(new Date().getDate() + 1) // Expiry in 1 day
}, authentication.jwtSecret)

const USER_EXISTS_ERROR = 'This username already exists'
const USER_DOES_NOT_EXIST_ERROR = 'This username does not exist'
const INCORRECT_PASSWORD = 'Password incorrect'

module.exports = {
  async register(req, res, next) {
    const tUser = TUser(req.body)

    const user = await UserService.getByUsername(tUser.username)

    if (user) {
      try {
        throw new ErrorHandler(403, USER_EXISTS_ERROR, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const newUser = await UserService.create(tUser)

        handleResponse({ user: sculpt(newUser, ['username', 'firstName', 'lastName', 'role']) }, res)
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
          user: sculpt(user, ['username', 'role.id', 'role.name']),
          token: jwtSignUser(user)
        }

        handleResponse(data, res)
      } catch (err) {
        next(err)
      }
    }
  },
  async update(req, res, next) {
    const { params, body } = req

    try {
      if (!isIdValidObjectId(params.userId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const tUser = TUser(body)

      const response = await UserService.updateById(params.userId, tUser)

      if (!response) throw new ErrorHandler(500, 'User not found', __filename)

      handleResponse(response, res)
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    const { userId } = req.params

    try {
      const isPermitted = await Permissions.require(req, roles.super, next)
      if (!isPermitted) throw new ErrorHandler(403, 'Missing required permission', __filename)

      if (!isIdValidObjectId(userId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const response = await UserService.delete(userId)

      handleResponse(response, res)
    } catch (err) {
      next(err)
    }
  },
  async list(req, res, next) {
    const { query } = req

    const criteria = Criteria(query, UserCriterion)

    try {
      const result = await UserService.list(criteria)

      searchResult(res, criteria, result, ['username', 'role.name'])
    } catch (err) {
      next(err)
    }
  },
  async getOneUser(req, res, next) {
    const { userId } = req.params

    try {
      const user = await UserService.getById(userId)

      handleResponse({ user: sculpt(user) }, res)
    } catch (err) {
      next(err)
    }
  },
  // This function will be deleted before production
  async createRole(req, res, next) {
    const { body } = req

    try {
      const role = await RoleService.create(body)

      handleResponse({ role }, res)
    } catch (err) {
      next(err)
    }
  }
}
