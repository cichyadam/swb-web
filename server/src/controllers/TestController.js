const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
const { UserCriterion, Criteria } = require('../helpers/criterions/criterions')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { ErrorHandler, handleMongooseError } = require('../helpers/errors/error')
const { sculpt } = require('../helpers/resources/interface')
const { toArray, isIdValidObjectId } = require('../helpers/utilities/utilities')

module.exports = {
  async test(req, res, next) {
    res.json(req.body)
  },
  async testTwo(req, res, next) {
    const { id } = req.params

    try {
      const isIdValid = isIdValidObjectId(id)

      if (!isIdValid) throw new ErrorHandler(403, 'Invalid id passed in params', __filename)

      handleResponse({ message: 'OK' }, res)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res) {
    const { token } = req.query
    const { role } = req.body

    const decoded = jwt.decode(token)

    if (!role) res.status(403).send('Missing role')

    await UserService.assignRole(decoded.sub, role)

    const test = await UserService.getById(decoded.sub)

    res.json(test)
  }
}
