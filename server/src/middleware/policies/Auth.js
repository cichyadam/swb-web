const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const { ErrorHandler } = require('../../helpers/errors/error')

module.exports = {
  authorize: (req, res, next) => {
    const { token } = req.query

    jwt.verify(token, config.authentication.jwtSecret, (err) => {
      if (err) {
        throw new ErrorHandler(403, err, __filename)
      } else {
        next()
      }
    })
  }
}
