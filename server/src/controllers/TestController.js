const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
const { UserCriterion, Criteria } = require('../helpers/criterions/criterions')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { sculpt } = require('../helpers/resources/interface')

module.exports = {
  async test(req, res, next) {
    const { query } = req

    const criteria = Criteria(query, UserCriterion)

    try {
      const result = await UserService.list(criteria)

      searchResult(res, criteria, result, ['username', 'role.name'])
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
