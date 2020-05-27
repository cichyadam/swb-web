const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
const { ErrorHandler } = require('../helpers/errors/error')

module.exports = {
  async require(req, level, next) {
    const { token } = req.query

    if (!token) {
      next(new ErrorHandler(403, 'Token is missing', __filename))
      return false
    }

    const decoded = jwt.decode(token)

    const { role } = await UserService.getById(decoded.sub)

    if (level === 'super') return ['superadmin'].includes(role.name)
    if (level === 'admin') return ['superadmin', 'admin'].includes(role.name)
    if (level === 'cooperator') return ['superadmin', 'admin', 'cooperator'].includes(role.name)
    return false
  },
  getUserFromToken(req) {
    const { token } = req.query

    const decoded = jwt.decode(token)

    return UserService.getById(decoded.sub)
  }
}
