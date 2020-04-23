const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { handleError } = require('./helpers/errors/error')

const app = express()

// # Middleware

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  bodyParser.json({
    type: 'application/json'
  })
)
app.use(cors())
app.use(helmet())

// # Routes

require('./routes')(app)

// # Handlers

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
