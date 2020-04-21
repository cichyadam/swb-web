const { ErrorHandler } = require('../../helpers/errors/error')

const requestValidator = (schema, property) => { 
  return (req, res, next) => {
    const { body } = req
    const { error } = schema.validate(body)
    const valid = error === null || !error

    if (!valid) {
      const { details } = error
      const message = details.map(i => i.message).join(',')

      throw new ErrorHandler(403, message, __filename)
    } else {
      next()
    } 
  }
}

module.exports = requestValidator
