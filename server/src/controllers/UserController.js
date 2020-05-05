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

        handleResponse({ user: sculpt(newUser) }, res)
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
      const response = await UserService.updateById(params.id, body)

      if (!response) throw new ErrorHandler(500, 'User not found', __filename)

      handleResponse(response, res)
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    const isPermitted = await Permissions.require(req, roles.super, next)

    if (!isPermitted) {
      next(new ErrorHandler(403, 'Missing required permission', __filename))
      return
    }

    try {
      const response = await UserService.delete({ _id: req.query.id })

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
  async get(req, res, next) {
    const { id } = req.params

    try {
      const user = await UserService.getById(id)

      handleResponse(user, res)
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
