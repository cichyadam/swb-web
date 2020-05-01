/* eslint-disable array-callback-return */
class ErrorHandler extends Error {
  constructor(statusCode, message, file) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.file = file
  }
}

const handleError = (err, res) => {
  if (Array.isArray(err) || err.name) {
    res.status(500).json({
      status: 'error',
      type: 'DatabaseError',
      code: 500,
      errors: err
    })
  } else {
    const { statusCode, message, file } = err

    res.status(statusCode || 500).json({
      status: 'error',
      code: statusCode || 500,
      message,
      stackTrace: {
        file
      }
    })
  }
}

const handleMongooseError = (errors) => {
  if (errors.code && errors.code === 11000) {
    return {
      name: 'duplicate entry',
      field: Object.keys(errors.keyPattern)[0]
    }
  }

  if (errors.errors) {
    const errArray = []

    Object.keys(errors.errors).map((field) => {
      errArray.push({
        name: field,
        type: errors.errors[field].name,
        kind: errors.errors[field].kind
      })
    })

    return errArray
  }

  console.log(errors)
}

module.exports = {
  ErrorHandler,
  handleError,
  handleMongooseError
}
