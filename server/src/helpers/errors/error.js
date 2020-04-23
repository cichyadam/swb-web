class ErrorHandler extends Error {
  constructor(statusCode, message, file) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.file = file
  }
}

const handleError = (err, res) => {
  if (Array.isArray(err)) {
    res.status(500).json({
      status: 'error',
      type: 'DatabaseError',
      code: 500,
      errors: err,
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
  const errArray = []

  Object.keys(errors).map(field => {
    errArray.push({
      name: field,
      type: errors[field].name,
      kind: errors[field].kind
    })
  })

  return errArray
}

module.exports = {
  ErrorHandler,
  handleError,
  handleMongooseError
}
