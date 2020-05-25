const path = require('path')
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
app.use('/static', express.static(path.join(__dirname, '/public')))
app.set('views', 'src/views')
app.set('view engine', 'ejs')

// # Routes

require('./routes')(app)

// # Handlers

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.send(200)
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
