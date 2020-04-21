const express = require('express')
const mongoose = require('mongoose')
const connectDb = require('./database/connection')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const config = require('./config/config')
const { handleError } = require('./helpers/errors/error')

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
    type: 'application/json',
}))
app.use(cors())
app.use(helmet())

require('./routes')(app)

app.use((err, req, res, next) => {
    handleError(err, res)
})

app.listen(config.port, (error) => {
    if (error) {
        console.log('\x1b[31m', error, '\x1b[0m')
    }
    console.log('\x1b[32m', `Running on http://${config.host}:${config.port}` , '\x1b[0m')

    connectDb().then(() => console.log('\x1b[32m', `Database running on ${config.db.uri}` , '\x1b[0m'))
})
