
class ErrorHandler extends Error {
  constructor(statusCode, message, file) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.file = file
  }
}

const handleError = (err, res) => {
  const { statusCode, message, file } = err

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    stackTrace: {
      file,
    }
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
